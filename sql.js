var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  return "create table Country (name text not null, code text not null, gdp int, population int);";
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  return "create table GoldMedal (id int primary key, year int not null, city text not null, season text not null, name text not null, country text not null, gender text not null, sport text not null, discipline text not null, event text not null);";
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    return `select count(*) from goldMedal where country ='${country}'`;
};

/*
Returns a SQL query string that will find the year where the given country
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
  return `select year, count(*) from goldMedal where country='${country}' and season='Summer' group by year order by 2 desc limit 1;`;
};

/*
Returns a SQL query string that will find the year where the given country
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  return `select year, count(*) from goldMedal where country='${country}' and season='Winter' group by year order by 2 desc limit 1;`;
};

/*
Returns a SQL query string that will find the year where the given country
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  return `select year, count(*) from goldMedal where country='${country}' group by year order by 2 desc limit 1;`;
};

/*
Returns a SQL query string that will find the discipline this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  return `select discipline, count(*) from goldMedal where country='${country}' group by discipline order by 2 desc limit 1;`;
};

/*
Returns a SQL query string that will find the sport this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  return `select sport, count(*) from goldMedal where country='${country}' group by discipline order by 2 desc limit 1;`;
};

/*
Returns a SQL query string that will find the event this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  return `select event, count(*) from goldMedal where country='${country}' group by event order by 2 desc limit 1;`;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  return `select count(distinct name) from goldMedal where country='${country}' and gender='Men';`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  return `select count(distinct name) from goldMedal where country='${country}' and gender='Women';`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  return `select count(*),name from goldMedal where country='${country}' group by name order by 2 desc limit 1;` ;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, isAscending) => {
  let orderingString = '';
  if (field) {
    if (isAscending) {
      orderingString = `ORDER BY ${field} ASC`;
    } else {
      orderingString = `ORDER BY ${field} DESC`;
    }
  }
  return `SELECT * FROM GoldMedal WHERE country = '${country}' ${orderingString};`;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, isAscending) => {
  let orderingString = '';
  if (field) {
    if (isAscending) {
      orderingString = `ORDER BY ${field} ASC`;
    } else {
      orderingString = `ORDER BY ${field} DESC`;
    }
  }
  return `SELECT sport, COUNT(sport) AS count, (COUNT(sport) * 100 / (select COUNT(*) FROM GoldMedal WHERE country = '${country}')) AS percent FROM GoldMedal WHERE country = '${country}' GROUP BY sport ${orderingString};`;
};


module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
