# Global Climate Visualization

This repository is a result of a Data Visualization project. The main purpose of the project is to generate insights about the global climate evolution over the years since 1850. 

## Motivation

The global climate is (or should be) a concern to the society since we began to experience the consequences of the global warming. Currently, there is a poor set of tools to analyze and comprehend available data on the subject.
The average global temperature increase is about 1°C every century, and we seem to neglect the severity of that. This project comes as a (*humble*) attempt to understand the data and contribute in some way to mitigate these effects.

## Data sources

All the  data used to produce the visualizations are publicly available at:
* Climate data: https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data.
* Location data: https://github.com/johan/world.geo.json/blob/master/countries.geo.json

This is a preview from the climate available *CSV*s:

![Raw Data Preview](https://github.com/dgmneto/projeto-visualizacao/blob/master/images/vis1.png)

### Data cleaning

From the raw data above, we realized that a great number of rows from dates before 1850 had missing information, something that would certainly disturb the visualizations we aimed to produce. Also, we realized that some country names on the both data sources were not fully compatible. Hence, we decided to:
* Use only climate data from 1850 and above.
* Update the data sets in order to make both of them compatible. 

### Generated data

We also needed to use some support data that was unavailable at the used datasets. There would be interesting to know for every country, what countries did evolve most similarly to them over the years. This processing could be online or offline, but we decided to have it offline, since the processing was way heavier than we expected.
Above, you can see a preview of the support data we generated:

![Support Data Preview](https://github.com/dgmneto/projeto-visualizacao/blob/master/images/vis3.jpg)

## Usage

To visualize the project, you can directly access https://globalclimate.tk/

Above you can se a preview:
![Project Preview](https://github.com/dgmneto/projeto-visualizacao/blob/master/images/vis2.png)

Another option is to download a local copy of this repository and run a local server on a parent directory, opening in the browser the *index.html* file.

It's necessary to create a first group in order to see the first timeline. Groups are used to separate different sets of countries which will be compared. Clicking at the group number will display a global map to select the countries from the group and display suggestions of countries which are the most related to the selected ones.

## Credits

The authors of the project:

* Divino Gervásio de Menezes Neto (@dgmneto)
* Higor Cavalcanti Machado Botelho (@Trakton)
* Ruy Brito Barbosa (@ruybrito106)

We would also like to thank professor Nivan Ferreira for all the support. To understand the project context and see another related projects for the same assignment, you can access https://visualizacao-ufpe.github.io/projects/2017_2.html

