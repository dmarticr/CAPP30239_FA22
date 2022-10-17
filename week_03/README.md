# Data for the Final Project

In 2016, after 4 years of negotiations, Colombia's government signed a Peace Accord with the Revolutionary Armed Forces of Colombia (FARC), one of the Latin American oldest guerrillas. This accord ended five decades of conflict and opened channels of reparation and truth to the victims. In line with the latter, the National Historical Memory Center (HMC) was created to clarify violent acts, dignify the voices of the victims and build sustainable peace in the territories.
During the last few years, the HMC has built an extensive public database that describes the evolution of violence in Colombia in relation to the armed conflict, which can be consulted at this <a href="https://micrositios.centrodememoriahistorica.gov.co/observatorio/portal-de-datos/base-de-datos/" target="_blank">link</a>. 
The original database I will use for my project is the historical record of cases of massacres (dta.xlsx; For this class's purposes, I will use dta_t.csv where t stands for translated). The main characteristics of this information are listed below:
•	Data Source: Centro Nacional de Memoria Histórica (HMC in English), located in Bogotá, Colombia. <a href="https://centrodememoriahistorica.gov.co/" target="_blank">Link</a>.
•	Description of data: 4309 observations regarding massacres. Each column is detailed below:
    o	ID = Unique identifier.
    o	RELATED_ID = ID from the victim’s dataset that matches the case.
    o	YEAR, MONTH & DAY of the massacre
    o	DPTOMPIO = municipality code (I also have a JSON file -Municipios.json- with the map of Colombia that has these codes too, but it is too big to push it right now and I am currently exploring ways to compress it)
    o	MPIO_CNMBR = municipality name
    o	DEPARTMENT = geographic identity that incorporates the municipalities
    o	REGION = geographic identity that incorporates the departments
    o	MODALITY of the massacre/crime
    o	RESPONSIBLE = identifies the category of the presumed responsible
    o	RESPONSIBLE_DESCRIPTION = specific name of the presumed perpetrator
    o	LAND_DISPOSSESSION = dummy variable that takes the value of 1 if the event involved the abandonment or forced dispossession of land.
    o	THREAT = dummy variable that takes the value of 1 if the event involved threat or intimidation
    o	MEDICAL_MISSION = dummy variable that takes the value of 1 if the event involved an attack on a medical mission.
    o	CONFINEMENT = dummy variable that takes the value of 1 if the event involved confinement or restriction of mobility.
    o	DISPLACEMENT = dummy variable that takes the value of 1 if the event involved confinement or restriction of mobility.
    o	EXTORTION = dummy variable that takes the value of 1 if the event involved extorsion.
    o	INJURIES = dummy variable that takes the value of 1 if the event involved civilian injured.
    o	PLUNDER = dummy variable that takes the value of 1 if the event involved plunder.
    o	TORTURE = dummy variable that takes the value of 1 if the event involved torture.
    o	GENDER_VIOLENCE = dummy variable that takes the value of 1 if the event involved gender-based violence.
    o	SIMULTANEOUS_EVENT = describes another simultaneous event, if it is the case.
    o	VICTIMS = number of victims.
    o	WEAPONS
    o	LAT and LON are geographical coordinates.
•	Why you are interested in this topic: It is a sensitive issue, but I believe that it should be transmitted with the purpose of building a historical memory as a guarantee of non-repetition.
•	Thoughts on how you would hope to use this data & Potential data points: This database allows several uses:
    o	Historical evolution of massacres and number of victims
    o	distribution by type of offenders, and all the dichotomous variables described above.
    o	Geolocation of these cases is also available in the database.
    o	Combinations of the previous three.
•	Any concerns about the data: Nothing so far.
•	Identify if source is primary or secondary: It is primary data.
