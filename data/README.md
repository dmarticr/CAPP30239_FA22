## Data for the Final Project 📝

For my data project, I will use Video Game Sales from more than 20.000 games. This dataset has been taken from [vgchartz](https://www.vgchartz.com/) using the code located on [data/vgchartzScrape-master](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/vgchartzScrape-master).

Fields include
* **Rank**: Ranking of overall sales
* **Name**: The games name
* **Platform**: Platform of the games release (i.e. PC, PS4, etc.)
* **Year**: Year of the game's release
* **Genre**: Genre of the game
* **Publisher**: Publisher of the game
* **NA_Sales**: Sales in North America (in millions)
* **EU_Sales**: Sales in Europe (in millions)
* **JP_Sales**: Sales in Japan (in millions)
* **Other_Sales**: Sales in the rest of the world (in millions)
* **Global_Sales**: Total worldwide sales.

*Notes*:
* The script to scrape the data is also available at [https://github.com/GregorUT/vgchartzScrape](https://github.com/GregorUT/vgchartzScrape) (I did some modifications) and it uses BeautifulSoup in Python.
* The original dataset has 20.000 records, 497 records were dropped due to incomplete information.
* In this folder there are other datasets from data exploration, located on [data/other_options](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/other_options) which include violence data from Colombia and animal shelter records. You can omit those.
* This folder also includes the **3 Minute Overview** homework. Please refer to the file [3_minute_overview.pdf](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/process/3_minute_overview.pdf).
* The original dataset is [vgsales2.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/vgsales2.csv), and the resulting datasets after cleaning and summarizing data are:
    * [g11.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/g11.csv): sales per platform per release year.
    * [g11_alt.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/g11_alt.csv): sales per publisher per release year
    * [tree.json](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/tree.json): hierarchical data in the form **platform >> console >> video games**
    * [tree_alt.json](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/tree_alt.json): contains hierarchical data in the form **publisher >> platform >> video games**
    * [data1.json](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/data1.jsonv): total sales by genre.
    * [data2.json](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/data2.json): total sales by region.
    * [data3.json](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/data3.json): total sales by genre for Nintendo.
    * [data4.json](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/data4.json): total sales by region for Nintendo.
    * [rank.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/rank.csv): top 30 most popular (sold) videogames of all time.
* Files:
    * [cleaning_data.ipynb](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/cleaning_data.ipynb): process the original data to produce the data files previously described.
    * [index.html](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/index.html): main structure of the project.
    * [style.css](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/style.css): style of the project.
    * [stackedbar.js](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/stackedbar.js): Code for the first graph: vertical stacked bar.
    * [sunburst.js](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sunburst.js): Code for the second graph: zoomable sunburst diagram.
    * [button.js](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sunburst.js): Code for the third graph: simple vertical bar.
    * [bubble.js](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sunburst.js): Code for the fourth graph: bubble graph across time.
