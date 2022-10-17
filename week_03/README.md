# Data for the Final Project

In 2016, after 4 years of negotiations, Colombia's government signed a Peace Accord with the Revolutionary Armed Forces of Colombia (FARC), one of the Latin American oldest guerrillas. This accord ended five decades of conflict and opened channels of reparation and truth to the victims. In line with the latter, the National Historical Memory Center (HMC) was created to clarify violent acts, dignify the voices of the victims and build sustainable peace in the territories.

During the last few years, the HMC has built an extensive public database that describes the evolution of violence in Colombia in relation to the armed conflict, which can be consulted at this [link](https://micrositios.centrodememoriahistorica.gov.co/observatorio/portal-de-datos/base-de-datos/).

The original database I will use for my project is the historical record of cases of massacres (dta.xlsx; For this class's purposes, I will use dta_t.csv where t stands for translated). The main characteristics of this information are listed below:

* Data Source: Centro Nacional de Memoria Histórica (HMC in English), located in Bogotá, Colombia. [Link](https://centrodememoriahistorica.gov.co/).

* Description of data: 4309 observations regarding massacres. Each column is detailed below:

    * ID = Unique identifier.
    * RELATED_ID = ID from the victim’s dataset that matches the case.
    * YEAR, MONTH & DAY of the massacre
    * DPTOMPIO = municipality code (I also have a JSON file -Municipios.json- with the map of Colombia that has these codes too, but it is too big to push it right now and I am currently exploring ways to compress it)
    * MPIO_CNMBR = municipality name
    * DEPARTMENT = geographic identity that incorporates the municipalities
    * REGION = geographic identity that incorporates the departments
    * MODALITY of the massacre/crime
    * RESPONSIBLE = identifies the category of the presumed responsible
    * RESPONSIBLE_DESCRIPTION = specific name of the presumed perpetrator
    * LAND_DISPOSSESSION = dummy variable that takes the value of 1 if the event involved the abandonment or forced dispossession of land.
    * THREAT = dummy variable that takes the value of 1 if the event involved threat or intimidation
    * MEDICAL_MISSION = dummy variable that takes the value of 1 if the event involved an attack on a medical mission.
    * CONFINEMENT = dummy variable that takes the value of 1 if the event involved confinement or restriction of mobility.
    * DISPLACEMENT = dummy variable that takes the value of 1 if the event involved confinement or restriction of mobility.
    * EXTORTION = dummy variable that takes the value of 1 if the event involved extorsion.
    * INJURIES = dummy variable that takes the value of 1 if the event involved civilian injured.
    * PLUNDER = dummy variable that takes the value of 1 if the event involved plunder.
    * TORTURE = dummy variable that takes the value of 1 if the event involved torture.
    * GENDER_VIOLENCE = dummy variable that takes the value of 1 if the event involved gender-based violence.
    * SIMULTANEOUS_EVENT = describes another simultaneous event, if it is the case.
    * VICTIMS = number of victims.
    * WEAPONS
    * LAT and LON are geographical coordinates.
* Why you are interested in this topic: It is a sensitive issue, but I believe that it should be transmitted with the purpose of building a historical memory as a guarantee of non-repetition.
* Thoughts on how you would hope to use this data & Potential data points: This database allows several uses:
    * Historical evolution of massacres and number of victims
    * distribution by type of offenders, and all the dichotomous variables described above.
    * Geolocation of these cases is also available in the database.
    * Combinations of the previous three.
* Any concerns about the data: Nothing so far.
* Identify if source is primary or secondary: It is primary data.
