drop table public.gewas_geschiktheid
create table public.gewas_geschiktheid ( geometry, bodemtype, klimaatzone, gewas, economische_waarde )
as 
select ST_intersection ( ST_Transform(t1.geom,3857), t2.geom ), t1.omschrijvi, t2.cls, 'aardbei' , 100 
from public.bodem t1, 
public.klimaatdata t2
where ST_intersects ( ST_Transform(t1.geom, 4326), ST_MakeEnvelope(4.5, 51.8, 4.9, 52.1, 4326) ) 
and   ST_intersects ( ST_Transform(t2.geom, 4326), ST_MakeEnvelope(4.5, 51.8, 4.9, 52.1, 4326) ) 
and   not ST_IsEmpty(ST_intersection ( ST_Transform(t1.geom,3857), t2.geom )) 

SELECT UpdateGeometrySRID('gewas_geschiktheid','geometry',3857)
CREATE INDEX gewas_geschiktheid_gix ON gewas_geschiktheid USING GIST (geometry);
ALTER TABLE gewas_geschiktheid ALTER COLUMN gewas TYPE varchar;

 


CREATE INDEX bodem_gix ON bodem USING GIST (geom);
CREATE INDEX klimaatdata_gix ON klimaatdata USING GIST (geom);
