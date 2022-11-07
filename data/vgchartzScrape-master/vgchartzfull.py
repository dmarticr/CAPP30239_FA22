from bs4 import BeautifulSoup, element
import urllib
import pandas as pd
import numpy as np
import time

pages = 21
rec_count = 0
rank = []
gname = []
platform = []
year = []
genre = []
#critic_score = []
#user_score = []
publisher = []
developer = []
sales_na = []
sales_pal = []
sales_jp = []
sales_ot = []
sales_gl = []
shipped = []

# urlhead = 'http://www.vgchartz.com/gamedb/?page='
# urltail = '&console=&region=All&developer=&publisher=&genre=&boxart=Both&ownership=Both'
# urltail += '&results=100&order=Sales&showtotalsales=0&showtotalsales=1&showpublisher=0'
# urltail += '&showpublisher=1&showvgchartzscore=0&shownasales=1&showdeveloper=1&showcriticscore=1'
# urltail += '&showpalsales=0&showpalsales=1&showreleasedate=1&showuserscore=1&showjapansales=1'
# urltail += '&showlastupdate=0&showothersales=1&showgenre=1&sort=GL'

urlhead = 'https://www.vgchartz.com/games/games.php?page='
urltail = '&results=1000&order=Sales&ownership=Both&direction=DESC&showtotalsales=1'
urltail += '&shownasales=1&showpalsales=1&showjapansales=1&showothersales=1&showpublisher=1'
urltail += '&showdeveloper=1&showreleasedate=1&showlastupdate=1&showvgchartzscore=1'
urltail += '&showcriticscore=1&showuserscore=1&showshipped=1'

def resolve_redirects(url):
    try:
        return urllib.request.urlopen(url).read()
    except:
        time.sleep(300)
        return resolve_redirects(url)

for page in range(1, pages):
    surl = urlhead + str(page) + urltail
    #r = urllib.request.urlopen(surl).read()
    r = resolve_redirects(surl)
    soup = BeautifulSoup(r, features = "lxml")
    print(f"Page: {page}")

    # vgchartz website is really weird so we have to search for
    # <a> tags with game urls
    
    ### The following lines were not working!!! (Diego Martinez)
    #game_tags = list(filter(
    #    lambda x: x.attrs['href'].startswith('https://www.vgchartz.com/game/'),
    #    # discard the first 10 elements because those
    #    # links are in the navigation bar
    #    soup.find_all("a")
    #))[10:]
    
    game_tags = []
    for x in soup.find_all("a"):
        if 'href' in x.attrs:
            if x.attrs['href'].startswith('https://www.vgchartz.com/game/') or\
                x.attrs['href'].startswith('http://www.vgchartz.com/game/'):
                game_tags.append(x)
                
    game_tags = game_tags

    for tag in game_tags:

        # add name to list
        gname.append(" ".join(tag.string.split()))
        print(f"{rec_count + 1} Fetch data for game {gname[-1]}")

        # get different attributes traverse up the DOM tree
        data = tag.parent.parent.find_all("td")
        
        rank.append(np.int32(data[0].string))
        platform.append(data[3].find('img').attrs['alt'])
        publisher.append(data[4].string)
        developer.append(data[5].string)
        
        #critic_score.append(
        #    float(data[7].string) if
        #    not data[7].string.startswith("N/A") else np.nan)
        
        #user_score.append(
        #    float(data[8].string) if
        #    not data[8].string.startswith("N/A") else np.nan)
        
        shipped.append(
            float(data[9].string[:-1]) if
            not data[9].string.startswith("N/A") else np.nan)
        
        sales_gl.append(
            float(data[10].string[:-1]) if
            not data[10].string.startswith("N/A") else np.nan)
        
        sales_na.append(
            float(data[11].string[:-1]) if
            not data[11].string.startswith("N/A") else np.nan)
        
        sales_pal.append(
            float(data[12].string[:-1]) if
            not data[12].string.startswith("N/A") else np.nan)
        
        sales_jp.append(
            float(data[13].string[:-1]) if
            not data[13].string.startswith("N/A") else np.nan)
        
        sales_ot.append(
            float(data[14].string[:-1]) if
            not data[14].string.startswith("N/A") else np.nan)
    
        release_year = data[15].string.split()[-1]
        # different format for year
        if release_year.startswith('N/A'):
            year.append('N/A')
        else:
            if int(release_year) >= 50:
                year_to_add = np.int32("19" + release_year)
            else:
                year_to_add = np.int32("20" + release_year)
            year.append(year_to_add)

        # go to every individual website to get genre info
        url_to_game = tag.attrs['href']
        #site_raw = urllib.request.urlopen(url_to_game).read()
        site_raw = resolve_redirects(url_to_game)
        sub_soup = BeautifulSoup(site_raw, "html.parser")
        # again, the info box is inconsistent among games so we have to find all the
        # h2 and traverse from that to the genre name
        h2s = sub_soup.find("div", {"id": "gameGenInfoBox"}).find_all('h2')
        # make a temporary tag here to search for the one that contains the word "Genre"
        temp_tag = element.Tag
        for h2 in h2s:
            if h2.string == 'Genre':
                temp_tag = h2
        genre.append(temp_tag.next_sibling.string)
        rec_count += 1

columns = {
    'Rank': rank,
    'Name': gname,
    'Platform': platform,
    'Year': year,
    'Genre': genre,
    #'Critic_Score': critic_score,
    #'User_Score': user_score,
    'Publisher': publisher,
    'Developer': developer,
    'NA_Sales': sales_na,
    'PAL_Sales': sales_pal,
    'JP_Sales': sales_jp,
    'Other_Sales': sales_ot,
    'Global_Sales': sales_gl,
    'Total_Shipped': shipped
}

print(rec_count)
df = pd.DataFrame(columns)
print(df.columns)
df = df[['Rank', 'Name', 'Platform', 'Year', 'Genre','Publisher', 'Developer','NA_Sales',
         'PAL_Sales', 'JP_Sales','Other_Sales', 'Global_Sales','Total_Shipped']]
df['Sales'] = df['Global_Sales'] + df['Total_Shipped']
df.to_csv("vgsales2.csv", sep = ",", encoding = 'utf-8', index = False)
