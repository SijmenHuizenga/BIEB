--selecteer plantvakken die in de geometrie van de feature bodem vallen en kijk of de grondsoort overeenkomt--
SELECT pv.id, pv.gewas, pv.voorkeur_grondsoort, pv.geom, bm.omschrijvi, bm.geom
FROM plantvak as pv, bodem as bm
WHERE ST_INTERSECTS(bm.geom, pv.geom)
AND pv.voorkeur_grondsoort = bm.omschrijvi
ORDER BY pv.id

--selecteer de maand uit de huidige datum-- 
SELECT EXTRACT(MONTH FROM TIMESTAMP 'now()')

--selecteer de huidige maand en datum--
SELECT to_char(current_date, 'month')

SELECT now()

--selecteer gewassen die nu gezaaid kunnen worden--
SELECT gewas, eind_zaai_b
FROM plantvak
WHERE eind_zaai_b = to_char(current_date,'FMmonth')::varchar

--berekenen aantal vierkante meters per plantvak--
SELECT ST_Area(geom)::integer
FROM plantvak

--berekenen aantal planten per plantvak--
UPDATE plantvak
SET plantaantallen = ST_Area(geom) * 10000 / ((plantafstand + plantafstand) * (plantafstand + plantafstand))

--vaststellen optimale oogstdatum--


--berekenen welk gewas het meest geschikt is om te zaaien--
SELECT pv.id, pv.gewas, pv.eind_zaai_b, pv.voorkeur_grondsoort, pv.geom, bm.omschrijvi, bm.geom,
       CASE WHEN pv.eind_zaai_b = to_char(current_date,'FMmonth')::varchar AND pv.voorkeur_grondsoort = bm.omschrijvi THEN 'one'
	    WHEN pv.eind_zaai_b = to_char(current_date,'FMmonth')::varchar THEN 'two'
            WHEN pv.eind_zaai_b <> to_char(current_date,'FMmonth')::varchar THEN 'three'
	END
    FROM plantvak as pv, bodem as bm
    WHERE ST_INTERSECTS(bm.geom, pv.geom)
    ORDER BY pv.id

--berekenen welk gewas het meest geschikt is om te zaaien (start- en eindzaaitijd)--
SELECT pv.id, pv.gewas, pv.eind_zaai_b, pv.voorkeur_grondsoort, pv.geom, bm.omschrijvi, bm.geom,
       CASE WHEN pv.eind_zaai_b = to_char(current_date,'FMmonth')::varchar AND pv.voorkeur_grondsoort = bm.omschrijvi THEN 'one'
	    WHEN pv.eind_zaai_b = to_char(current_date,'FMmonth')::varchar THEN 'two'
            WHEN pv.eind_zaai_b <> to_char(current_date,'FMmonth')::varchar THEN 'three'
	END
    FROM plantvak as pv, bodem as bm
    WHERE ST_INTERSECTS(bm.geom, pv.geom)
    ORDER BY pv.id

--zet maandbenaming om naar een datum--
ALTER TABLE plantvak ALTER COLUMN test_datum TYPE DATE
using to_date(test_datum,'month')

--zet de datum om naar een maandnotatie in type varchar--
ALTER TABLE plantvak ALTER COLUMN test_datum TYPE VARCHAR
using to_char(test_datum,'FMMM')::varchar

--zet de maandnotatie om naar het type integer--
ALTER TABLE plantvak ALTER COLUMN test_datum2 TYPE INTEGER
using CAST (test_datum2 AS INTEGER)

--test berekenen geschikte zaaitijd via test datums op basis van cijfers--
SELECT pv.id, pv.gewas, pv.eind_zaai_b, pv.voorkeur_grondsoort, pv.geom, pv.test_datum, pv.test_datum2, bm.omschrijvi, bm.geom,
       CASE WHEN ((to_char(current_date,'FMMM')::integer BETWEEN pv.test_datum AND pv.test_datum2) OR pv.test_datum = to_char(current_date,'FMMM')::integer OR pv.test_datum2 = to_char(current_date,'FMMM')::integer) AND pv.voorkeur_grondsoort = bm.omschrijvi THEN 'Geschikt om te zaaien'
	    WHEN (to_char(current_date,'FMMM')::integer BETWEEN pv.test_datum AND pv.test_datum2) OR pv.test_datum = to_char(current_date,'FMMM')::integer OR pv.test_datum2 = to_char(current_date,'FMMM')::integer THEN 'Grond moet opgewerkt worden om te kunnen zaaien'
            ELSE 'Nog niet het ideale zaaimoment om te zaaien'
	END
    FROM plantvak as pv, bodem as bm
    WHERE ST_INTERSECTS(bm.geom, pv.geom)
    ORDER BY pv.id

--aanpassen coordinaatsysteem kolom--
SELECT UpdateGeometrySRID('bodem','geom',3857)


--Vullen kolom prioriteit vanuit update case--
UPDATE plantvak
SET prioriteit = 
(CASE WHEN ((to_char(current_date,'FMMM')::integer BETWEEN pv.test_datum AND pv.test_datum2) OR pv.test_datum = to_char(current_date,'FMMM')::integer OR pv.test_datum2 = to_char(current_date,'FMMM')::integer) AND pv.voorkeur_grondsoort = bm.omschrijvi THEN pv.prioriteit = 'one'
	    WHEN (to_char(current_date,'FMMM')::integer BETWEEN pv.test_datum AND pv.test_datum2) OR pv.test_datum = to_char(current_date,'FMMM')::integer OR pv.test_datum2 = to_char(current_date,'FMMM')::integer THEN pv.prioriteit = 'two'
            ELSE pv.prioriteit = 'three'
	END)
FROM plantvak as pv, bodem as bm



