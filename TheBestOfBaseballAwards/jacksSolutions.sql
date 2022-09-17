SELECT teams.name, batting.yearid, AVG(people.weight)
FROM people
INNER JOIN batting ON people.playerid=batting.playerid
INNER JOIN teams ON batting.team_id=teams.id
GROUP BY teams.name, batting.yearid
ORDER BY AVG(people.weight) DESC;

//CHICAGO WHITE SOX

SELECT teams.name, batting.yearid, AVG(people.height)
FROM people
INNER JOIN batting ON people.playerid=batting.playerid
INNER JOIN teams ON batting.team_id=teams.id
GROUP BY teams.name, batting.yearid
ORDER BY AVG(people.height) ASC;

//MIDDLETOWN MANSFIELDS

SELECT teams.name, salaries.yearid, SUM(salaries.salary)
FROM salaries
INNER JOIN teams ON salaries.team_id=teams.id
GROUP BY teams.name, salaries.yearid
ORDER BY SUM(salaries.salary) DESC;

//2013 NY YANKEES (booooooo....)

SELECT teams.name, salaries.yearid, SUM(salaries.salary) / teams.w
FROM salaries
INNER JOIN teams ON salaries.team_id=teams.id
WHERE salaries.yearid=2010
GROUP BY teams.name, salaries.yearid, teams.w
ORDER BY SUM(salaries.salary) / teams.w ASC;

//2010 SAN DIEGO PADRES

SELECT salaries.salary / pitching.gs AS average, people.namefirst, people.namelast, salaries.yearid
FROM salaries
INNER JOIN pitching ON salaries.playerid=pitching.playerid
  AND salaries.yearid=pitching.yearid
  AND salaries.teamid=pitching.teamid
INNER JOIN people ON salaries.playerid=people.playerid
WHERE pitching.gs > 10
ORDER BY salaries.salary / pitching.gs DESC;

//CLIFF LEE 2014