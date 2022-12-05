## Data for the Final Project 📝

For my data project, I will use Video Game Sales from more than 20.000 games. This dataset has been taken from [Kaggle](https://www.kaggle.com/datasets/gregorut/videogamesales), being a scrape of [vgchartz](https://www.vgchartz.com/) using the code located on [data/vgchartzScrape-master](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/vgchartzScrape-master).

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
* The script to scrape the data is also available at [https://github.com/GregorUT/vgchartzScrape](https://github.com/GregorUT/vgchartzScrape) (I did some modifications because it was not running) and it is based on BeautifulSoup using Python.
* The original dataset has 16,598 records, 2 records were dropped by their authors due to incomplete information.
* In this folder there are other datasets from data exploration, located on [data/other_options](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/other_options) which include violence data from Colombia and animal shelter records. You can omit those.
* This folder also includes the **3 Minute Overview** homework. Please refer to the file [3_minute_overview.pdf](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/3_minute_overview.pdf).
* The original dataset is [vgsales.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/vgsales.csv), and the resulting datasets after cleaning and summarizing data are:
    * [sales_genre.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sales_genre.csv): contains sales per genre per year.
    * [sales_platform.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sales_platform.csv): contains sales per platform per year.
    * [sales_publisher.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sales_publisher.csv): contains sales per publisher per year.
    * [sales_region.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sales_region.csv): contains sales per region per year.
    * [sales_tot.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/sales_tot.csv): : contains sales per year.
    * [totrank_genre.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/totrank_genre.csv): contains total sales per genre.
    * [totrank_platform.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/totrank_platform.csv): contains total sales per platform.
    * [totrank_publisher.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/totrank_publisher.csv): contains total sales per publisher.
    * [totrank_region.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/totrank_region.csv): contains total sales per region.
    * [rank_names.csv](https://github.com/dmarticr/CAPP30239_FA22/tree/main/data/rank_names.csv): contains total ranking per name.
