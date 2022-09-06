--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Ubuntu 12.1-1.pgdg16.04+1)
-- Dumped by pg_dump version 14.2

-- Started on 2022-09-06 15:54:41 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 10 (class 2615 OID 294916)
-- Name: topology; Type: SCHEMA; Schema: -; Owner: situser
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO situser;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 10
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: situser
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- TOC entry 2 (class 3079 OID 294917)
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- TOC entry 3 (class 3079 OID 294918)
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- TOC entry 4 (class 3079 OID 294919)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- TOC entry 5 (class 3079 OID 294921)
-- Name: postgis_raster-3; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "postgis_raster-3" WITH SCHEMA public;


--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 5
-- Name: EXTENSION "postgis_raster-3"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "postgis_raster-3" IS 'PostGIS raster types and functions';


--
-- TOC entry 6 (class 3079 OID 294922)
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 6
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- TOC entry 531 (class 1255 OID 295106)
-- Name: addbbox(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.addbbox(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_addBBOX';


ALTER FUNCTION public.addbbox(public.geometry) OWNER TO postgres;

--
-- TOC entry 551 (class 1255 OID 295113)
-- Name: addpoint(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.addpoint(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_addpoint';


ALTER FUNCTION public.addpoint(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 552 (class 1255 OID 295114)
-- Name: addpoint(public.geometry, public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.addpoint(public.geometry, public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_addpoint';


ALTER FUNCTION public.addpoint(public.geometry, public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 579 (class 1255 OID 295119)
-- Name: affine(public.geometry, double precision, double precision, double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.affine(public.geometry, double precision, double precision, double precision, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1,  $2, $3, 0,  $4, $5, 0,  0, 0, 1,  $6, $7, 0)$_$;


ALTER FUNCTION public.affine(public.geometry, double precision, double precision, double precision, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 580 (class 1255 OID 295120)
-- Name: affine(public.geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.affine(public.geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_affine';


ALTER FUNCTION public.affine(public.geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 581 (class 1255 OID 295121)
-- Name: area(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.area(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'ST_Area';


ALTER FUNCTION public.area(public.geometry) OWNER TO postgres;

--
-- TOC entry 582 (class 1255 OID 295122)
-- Name: area2d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.area2d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'ST_Area';


ALTER FUNCTION public.area2d(public.geometry) OWNER TO postgres;

--
-- TOC entry 583 (class 1255 OID 295123)
-- Name: asbinary(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asbinary(public.geometry) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asBinary';


ALTER FUNCTION public.asbinary(public.geometry) OWNER TO postgres;

--
-- TOC entry 584 (class 1255 OID 295124)
-- Name: asbinary(public.geometry, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asbinary(public.geometry, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asBinary';


ALTER FUNCTION public.asbinary(public.geometry, text) OWNER TO postgres;

--
-- TOC entry 585 (class 1255 OID 295125)
-- Name: asewkb(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asewkb(public.geometry) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'WKBFromLWGEOM';


ALTER FUNCTION public.asewkb(public.geometry) OWNER TO postgres;

--
-- TOC entry 586 (class 1255 OID 295126)
-- Name: asewkb(public.geometry, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asewkb(public.geometry, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'WKBFromLWGEOM';


ALTER FUNCTION public.asewkb(public.geometry, text) OWNER TO postgres;

--
-- TOC entry 587 (class 1255 OID 295127)
-- Name: asewkt(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asewkt(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asEWKT';


ALTER FUNCTION public.asewkt(public.geometry) OWNER TO postgres;

--
-- TOC entry 588 (class 1255 OID 295128)
-- Name: asgml(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asgml(public.geometry) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT _ST_AsGML(2, $1, 15, 0, null, null)$_$;


ALTER FUNCTION public.asgml(public.geometry) OWNER TO postgres;

--
-- TOC entry 589 (class 1255 OID 295129)
-- Name: asgml(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asgml(public.geometry, integer) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT _ST_AsGML(2, $1, $2, 0, null, null)$_$;


ALTER FUNCTION public.asgml(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 590 (class 1255 OID 295130)
-- Name: ashexewkb(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ashexewkb(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asHEXEWKB';


ALTER FUNCTION public.ashexewkb(public.geometry) OWNER TO postgres;

--
-- TOC entry 591 (class 1255 OID 295131)
-- Name: ashexewkb(public.geometry, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ashexewkb(public.geometry, text) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asHEXEWKB';


ALTER FUNCTION public.ashexewkb(public.geometry, text) OWNER TO postgres;

--
-- TOC entry 592 (class 1255 OID 295132)
-- Name: askml(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.askml(public.geometry) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_AsKML(ST_Transform($1,4326), 15, null)$_$;


ALTER FUNCTION public.askml(public.geometry) OWNER TO postgres;

--
-- TOC entry 593 (class 1255 OID 295133)
-- Name: askml(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.askml(public.geometry, integer) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_AsKML(ST_transform($1,4326), $2, null)$_$;


ALTER FUNCTION public.askml(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 594 (class 1255 OID 295134)
-- Name: askml(integer, public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.askml(integer, public.geometry, integer) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_AsKML(ST_Transform($2,4326), $3, null)$_$;


ALTER FUNCTION public.askml(integer, public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 463 (class 1255 OID 295135)
-- Name: assvg(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.assvg(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asSVG';


ALTER FUNCTION public.assvg(public.geometry) OWNER TO postgres;

--
-- TOC entry 464 (class 1255 OID 295136)
-- Name: assvg(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.assvg(public.geometry, integer) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asSVG';


ALTER FUNCTION public.assvg(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 465 (class 1255 OID 295137)
-- Name: assvg(public.geometry, integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.assvg(public.geometry, integer, integer) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asSVG';


ALTER FUNCTION public.assvg(public.geometry, integer, integer) OWNER TO postgres;

--
-- TOC entry 466 (class 1255 OID 295138)
-- Name: astext(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.astext(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asText';


ALTER FUNCTION public.astext(public.geometry) OWNER TO postgres;

--
-- TOC entry 467 (class 1255 OID 295139)
-- Name: azimuth(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.azimuth(public.geometry, public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_azimuth';


ALTER FUNCTION public.azimuth(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 468 (class 1255 OID 295140)
-- Name: bdmpolyfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.bdmpolyfromtext(text, integer) RETURNS public.geometry
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := ST_Multi(ST_BuildArea(mline));

	RETURN geom;
END;
$_$;


ALTER FUNCTION public.bdmpolyfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 472 (class 1255 OID 295141)
-- Name: bdpolyfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.bdpolyfromtext(text, integer) RETURNS public.geometry
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := ST_BuildArea(mline);

	IF GeometryType(geom) != 'POLYGON'
	THEN
		RAISE EXCEPTION 'Input returns more then a single polygon, try using BdMPolyFromText instead';
	END IF;

	RETURN geom;
END;
$_$;


ALTER FUNCTION public.bdpolyfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 473 (class 1255 OID 295142)
-- Name: boundary(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.boundary(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'boundary';


ALTER FUNCTION public.boundary(public.geometry) OWNER TO postgres;

--
-- TOC entry 482 (class 1255 OID 295151)
-- Name: buffer(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buffer(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'buffer';


ALTER FUNCTION public.buffer(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 483 (class 1255 OID 295152)
-- Name: buffer(public.geometry, double precision, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buffer(public.geometry, double precision, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Buffer($1, $2, $3)$_$;


ALTER FUNCTION public.buffer(public.geometry, double precision, integer) OWNER TO postgres;

--
-- TOC entry 484 (class 1255 OID 295153)
-- Name: buildarea(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buildarea(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'ST_BuildArea';


ALTER FUNCTION public.buildarea(public.geometry) OWNER TO postgres;

--
-- TOC entry 488 (class 1255 OID 295157)
-- Name: centroid(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.centroid(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'centroid';


ALTER FUNCTION public.centroid(public.geometry) OWNER TO postgres;

--
-- TOC entry 538 (class 1255 OID 295161)
-- Name: collect(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.collect(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE
    AS '$libdir/postgis-3', 'LWGEOM_collect';


ALTER FUNCTION public.collect(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 539 (class 1255 OID 295162)
-- Name: combine_bbox(public.box2d, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.combine_bbox(public.box2d, public.geometry) RETURNS public.box2d
    LANGUAGE c IMMUTABLE
    AS '$libdir/postgis-3', 'BOX2D_combine';


ALTER FUNCTION public.combine_bbox(public.box2d, public.geometry) OWNER TO postgres;

--
-- TOC entry 540 (class 1255 OID 295163)
-- Name: combine_bbox(public.box3d, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.combine_bbox(public.box3d, public.geometry) RETURNS public.box3d
    LANGUAGE c IMMUTABLE
    AS '$libdir/postgis-3', 'BOX3D_combine';


ALTER FUNCTION public.combine_bbox(public.box3d, public.geometry) OWNER TO postgres;

--
-- TOC entry 541 (class 1255 OID 295164)
-- Name: contains(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.contains(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'contains';


ALTER FUNCTION public.contains(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 545 (class 1255 OID 295168)
-- Name: convexhull(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.convexhull(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'convexhull';


ALTER FUNCTION public.convexhull(public.geometry) OWNER TO postgres;

--
-- TOC entry 546 (class 1255 OID 295169)
-- Name: crosses(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.crosses(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'crosses';


ALTER FUNCTION public.crosses(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 338 (class 1255 OID 295211)
-- Name: difference(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.difference(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'ST_Difference';


ALTER FUNCTION public.difference(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 339 (class 1255 OID 295212)
-- Name: dimension(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dimension(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_dimension';


ALTER FUNCTION public.dimension(public.geometry) OWNER TO postgres;

--
-- TOC entry 341 (class 1255 OID 295214)
-- Name: disjoint(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.disjoint(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'disjoint';


ALTER FUNCTION public.disjoint(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 342 (class 1255 OID 295215)
-- Name: distance(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.distance(public.geometry, public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'ST_Distance';


ALTER FUNCTION public.distance(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 343 (class 1255 OID 295216)
-- Name: distance_sphere(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.distance_sphere(public.geometry, public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'LWGEOM_distance_sphere';


ALTER FUNCTION public.distance_sphere(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 344 (class 1255 OID 295217)
-- Name: distance_spheroid(public.geometry, public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.distance_spheroid(public.geometry, public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'LWGEOM_distance_ellipsoid';


ALTER FUNCTION public.distance_spheroid(public.geometry, public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 345 (class 1255 OID 295218)
-- Name: dropbbox(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dropbbox(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_dropBBOX';


ALTER FUNCTION public.dropbbox(public.geometry) OWNER TO postgres;

--
-- TOC entry 640 (class 1255 OID 295231)
-- Name: dump(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dump(public.geometry) RETURNS SETOF public.geometry_dump
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_dump';


ALTER FUNCTION public.dump(public.geometry) OWNER TO postgres;

--
-- TOC entry 641 (class 1255 OID 295232)
-- Name: dumprings(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dumprings(public.geometry) RETURNS SETOF public.geometry_dump
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_dump_rings';


ALTER FUNCTION public.dumprings(public.geometry) OWNER TO postgres;

--
-- TOC entry 643 (class 1255 OID 295234)
-- Name: endpoint(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.endpoint(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_endpoint_linestring';


ALTER FUNCTION public.endpoint(public.geometry) OWNER TO postgres;

--
-- TOC entry 644 (class 1255 OID 295235)
-- Name: envelope(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.envelope(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_envelope';


ALTER FUNCTION public.envelope(public.geometry) OWNER TO postgres;

--
-- TOC entry 646 (class 1255 OID 295237)
-- Name: estimated_extent(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.estimated_extent(text, text) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT SECURITY DEFINER
    AS '$libdir/postgis-3', 'geometry_estimated_extent';


ALTER FUNCTION public.estimated_extent(text, text) OWNER TO postgres;

--
-- TOC entry 647 (class 1255 OID 295238)
-- Name: estimated_extent(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.estimated_extent(text, text, text) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT SECURITY DEFINER
    AS '$libdir/postgis-3', 'geometry_estimated_extent';


ALTER FUNCTION public.estimated_extent(text, text, text) OWNER TO postgres;

--
-- TOC entry 648 (class 1255 OID 295239)
-- Name: expand(public.box2d, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.expand(public.box2d, double precision) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX2D_expand';


ALTER FUNCTION public.expand(public.box2d, double precision) OWNER TO postgres;

--
-- TOC entry 649 (class 1255 OID 295240)
-- Name: expand(public.box3d, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.expand(public.box3d, double precision) RETURNS public.box3d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_expand';


ALTER FUNCTION public.expand(public.box3d, double precision) OWNER TO postgres;

--
-- TOC entry 650 (class 1255 OID 295241)
-- Name: expand(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.expand(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_expand';


ALTER FUNCTION public.expand(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 651 (class 1255 OID 295242)
-- Name: exteriorring(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.exteriorring(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_exteriorring_polygon';


ALTER FUNCTION public.exteriorring(public.geometry) OWNER TO postgres;

--
-- TOC entry 652 (class 1255 OID 295243)
-- Name: find_extent(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.find_extent(text, text) RETURNS public.box2d
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
DECLARE
	tablename alias for $1;
	columnname alias for $2;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT ST_Extent("' || columnname || '") As extent FROM "' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$_$;


ALTER FUNCTION public.find_extent(text, text) OWNER TO postgres;

--
-- TOC entry 653 (class 1255 OID 295244)
-- Name: find_extent(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.find_extent(text, text, text) RETURNS public.box2d
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
DECLARE
	schemaname alias for $1;
	tablename alias for $2;
	columnname alias for $3;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT ST_Extent("' || columnname || '") FROM "' || schemaname || '"."' || tablename || '" As extent ' LOOP
		return myrec.extent;
	END LOOP;
END;
$_$;


ALTER FUNCTION public.find_extent(text, text, text) OWNER TO postgres;

--
-- TOC entry 655 (class 1255 OID 295246)
-- Name: fix_geometry_columns(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fix_geometry_columns() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
	mislinked record;
	result text;
	linked integer;
	deleted integer;
	foundschema integer;
BEGIN

	-- Since 7.3 schema support has been added.
	-- Previous postgis versions used to put the database name in
	-- the schema column. This needs to be fixed, so we try to
	-- set the correct schema for each geometry_colums record
	-- looking at table, column, type and srid.
	
	return 'This function is obsolete now that geometry_columns is a view';

END;
$$;


ALTER FUNCTION public.fix_geometry_columns() OWNER TO postgres;

--
-- TOC entry 408 (class 1255 OID 295247)
-- Name: force_2d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.force_2d(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_2d';


ALTER FUNCTION public.force_2d(public.geometry) OWNER TO postgres;

--
-- TOC entry 409 (class 1255 OID 295248)
-- Name: force_3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.force_3d(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_3dz';


ALTER FUNCTION public.force_3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 410 (class 1255 OID 295249)
-- Name: force_3dm(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.force_3dm(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_3dm';


ALTER FUNCTION public.force_3dm(public.geometry) OWNER TO postgres;

--
-- TOC entry 411 (class 1255 OID 295250)
-- Name: force_3dz(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.force_3dz(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_3dz';


ALTER FUNCTION public.force_3dz(public.geometry) OWNER TO postgres;

--
-- TOC entry 412 (class 1255 OID 295251)
-- Name: force_4d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.force_4d(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_4d';


ALTER FUNCTION public.force_4d(public.geometry) OWNER TO postgres;

--
-- TOC entry 413 (class 1255 OID 295252)
-- Name: force_collection(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.force_collection(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_collection';


ALTER FUNCTION public.force_collection(public.geometry) OWNER TO postgres;

--
-- TOC entry 414 (class 1255 OID 295253)
-- Name: forcerhr(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.forcerhr(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_clockwise_poly';


ALTER FUNCTION public.forcerhr(public.geometry) OWNER TO postgres;

--
-- TOC entry 605 (class 1255 OID 295277)
-- Name: geomcollfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomcollfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE
	WHEN geometrytype(GeomFromText($1)) = 'GEOMETRYCOLLECTION'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.geomcollfromtext(text) OWNER TO postgres;

--
-- TOC entry 606 (class 1255 OID 295278)
-- Name: geomcollfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomcollfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE
	WHEN geometrytype(GeomFromText($1, $2)) = 'GEOMETRYCOLLECTION'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.geomcollfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 607 (class 1255 OID 295279)
-- Name: geomcollfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomcollfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE
	WHEN geometrytype(GeomFromWKB($1)) = 'GEOMETRYCOLLECTION'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.geomcollfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 608 (class 1255 OID 295280)
-- Name: geomcollfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomcollfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE
	WHEN geometrytype(GeomFromWKB($1, $2)) = 'GEOMETRYCOLLECTION'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.geomcollfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 675 (class 1255 OID 295337)
-- Name: geometryfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geometryfromtext(text) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_from_text';


ALTER FUNCTION public.geometryfromtext(text) OWNER TO postgres;

--
-- TOC entry 676 (class 1255 OID 295338)
-- Name: geometryfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geometryfromtext(text, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_from_text';


ALTER FUNCTION public.geometryfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 677 (class 1255 OID 295339)
-- Name: geometryn(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geometryn(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_geometryn_collection';


ALTER FUNCTION public.geometryn(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 682 (class 1255 OID 295344)
-- Name: geomfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_GeomFromText($1)$_$;


ALTER FUNCTION public.geomfromtext(text) OWNER TO postgres;

--
-- TOC entry 683 (class 1255 OID 295345)
-- Name: geomfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_GeomFromText($1, $2)$_$;


ALTER FUNCTION public.geomfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 684 (class 1255 OID 295346)
-- Name: geomfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomfromwkb(bytea) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_from_WKB';


ALTER FUNCTION public.geomfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 685 (class 1255 OID 295347)
-- Name: geomfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_SetSRID(ST_GeomFromWKB($1), $2)$_$;


ALTER FUNCTION public.geomfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 686 (class 1255 OID 295348)
-- Name: geomunion(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomunion(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'ST_Union';


ALTER FUNCTION public.geomunion(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 688 (class 1255 OID 295350)
-- Name: getbbox(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getbbox(public.geometry) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_to_BOX2D';


ALTER FUNCTION public.getbbox(public.geometry) OWNER TO postgres;

--
-- TOC entry 689 (class 1255 OID 295351)
-- Name: getsrid(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getsrid(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_get_srid';


ALTER FUNCTION public.getsrid(public.geometry) OWNER TO postgres;

--
-- TOC entry 706 (class 1255 OID 295368)
-- Name: hasbbox(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.hasbbox(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_hasBBOX';


ALTER FUNCTION public.hasbbox(public.geometry) OWNER TO postgres;

--
-- TOC entry 707 (class 1255 OID 295369)
-- Name: interiorringn(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.interiorringn(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_interiorringn_polygon';


ALTER FUNCTION public.interiorringn(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 708 (class 1255 OID 295370)
-- Name: intersection(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.intersection(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'ST_Intersection';


ALTER FUNCTION public.intersection(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 709 (class 1255 OID 295371)
-- Name: intersects(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.intersects(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'ST_Intersects';


ALTER FUNCTION public.intersects(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 713 (class 1255 OID 295375)
-- Name: isclosed(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.isclosed(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_isclosed';


ALTER FUNCTION public.isclosed(public.geometry) OWNER TO postgres;

--
-- TOC entry 714 (class 1255 OID 295376)
-- Name: isempty(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.isempty(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_isempty';


ALTER FUNCTION public.isempty(public.geometry) OWNER TO postgres;

--
-- TOC entry 715 (class 1255 OID 295377)
-- Name: isring(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.isring(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'isring';


ALTER FUNCTION public.isring(public.geometry) OWNER TO postgres;

--
-- TOC entry 716 (class 1255 OID 295378)
-- Name: issimple(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.issimple(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'issimple';


ALTER FUNCTION public.issimple(public.geometry) OWNER TO postgres;

--
-- TOC entry 717 (class 1255 OID 295379)
-- Name: isvalid(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.isvalid(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'isvalid';


ALTER FUNCTION public.isvalid(public.geometry) OWNER TO postgres;

--
-- TOC entry 720 (class 1255 OID 295382)
-- Name: length(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.length(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_length_linestring';


ALTER FUNCTION public.length(public.geometry) OWNER TO postgres;

--
-- TOC entry 721 (class 1255 OID 295383)
-- Name: length2d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.length2d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_length2d_linestring';


ALTER FUNCTION public.length2d(public.geometry) OWNER TO postgres;

--
-- TOC entry 722 (class 1255 OID 295384)
-- Name: length2d_spheroid(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.length2d_spheroid(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'LWGEOM_length2d_ellipsoid';


ALTER FUNCTION public.length2d_spheroid(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 723 (class 1255 OID 295385)
-- Name: length3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.length3d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_length_linestring';


ALTER FUNCTION public.length3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 724 (class 1255 OID 295386)
-- Name: length3d_spheroid(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.length3d_spheroid(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_length_ellipsoid_linestring';


ALTER FUNCTION public.length3d_spheroid(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 725 (class 1255 OID 295387)
-- Name: length_spheroid(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.length_spheroid(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'LWGEOM_length_ellipsoid_linestring';


ALTER FUNCTION public.length_spheroid(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 726 (class 1255 OID 295388)
-- Name: line_interpolate_point(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.line_interpolate_point(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_line_interpolate_point';


ALTER FUNCTION public.line_interpolate_point(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 727 (class 1255 OID 295389)
-- Name: line_locate_point(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.line_locate_point(public.geometry, public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_line_locate_point';


ALTER FUNCTION public.line_locate_point(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 728 (class 1255 OID 295390)
-- Name: line_substring(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.line_substring(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_line_substring';


ALTER FUNCTION public.line_substring(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 729 (class 1255 OID 295391)
-- Name: linefrommultipoint(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linefrommultipoint(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_line_from_mpoint';


ALTER FUNCTION public.linefrommultipoint(public.geometry) OWNER TO postgres;

--
-- TOC entry 730 (class 1255 OID 295392)
-- Name: linefromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linefromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = 'LINESTRING'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.linefromtext(text) OWNER TO postgres;

--
-- TOC entry 731 (class 1255 OID 295393)
-- Name: linefromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linefromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = 'LINESTRING'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.linefromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 732 (class 1255 OID 295394)
-- Name: linefromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linefromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'LINESTRING'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.linefromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 733 (class 1255 OID 295395)
-- Name: linefromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linefromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'LINESTRING'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.linefromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 734 (class 1255 OID 295396)
-- Name: linemerge(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linemerge(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'linemerge';


ALTER FUNCTION public.linemerge(public.geometry) OWNER TO postgres;

--
-- TOC entry 735 (class 1255 OID 295397)
-- Name: linestringfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linestringfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT LineFromText($1)$_$;


ALTER FUNCTION public.linestringfromtext(text) OWNER TO postgres;

--
-- TOC entry 736 (class 1255 OID 295398)
-- Name: linestringfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linestringfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT LineFromText($1, $2)$_$;


ALTER FUNCTION public.linestringfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 737 (class 1255 OID 295399)
-- Name: linestringfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linestringfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'LINESTRING'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.linestringfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 738 (class 1255 OID 295400)
-- Name: linestringfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.linestringfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'LINESTRING'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.linestringfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 739 (class 1255 OID 295401)
-- Name: locate_along_measure(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.locate_along_measure(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_LocateBetween($1, $2, $2) $_$;


ALTER FUNCTION public.locate_along_measure(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 740 (class 1255 OID 295402)
-- Name: locate_between_measures(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.locate_between_measures(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_locate_between_m';


ALTER FUNCTION public.locate_between_measures(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 746 (class 1255 OID 295408)
-- Name: m(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.m(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_m_point';


ALTER FUNCTION public.m(public.geometry) OWNER TO postgres;

--
-- TOC entry 747 (class 1255 OID 295409)
-- Name: makebox2d(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makebox2d(public.geometry, public.geometry) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX2D_construct';


ALTER FUNCTION public.makebox2d(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 748 (class 1255 OID 295410)
-- Name: makebox3d(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makebox3d(public.geometry, public.geometry) RETURNS public.box3d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_construct';


ALTER FUNCTION public.makebox3d(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 749 (class 1255 OID 295411)
-- Name: makeline(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makeline(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makeline';


ALTER FUNCTION public.makeline(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 750 (class 1255 OID 295412)
-- Name: makeline_garray(public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makeline_garray(public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makeline_garray';


ALTER FUNCTION public.makeline_garray(public.geometry[]) OWNER TO postgres;

--
-- TOC entry 751 (class 1255 OID 295413)
-- Name: makepoint(double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makepoint(double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makepoint';


ALTER FUNCTION public.makepoint(double precision, double precision) OWNER TO postgres;

--
-- TOC entry 752 (class 1255 OID 295414)
-- Name: makepoint(double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makepoint(double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makepoint';


ALTER FUNCTION public.makepoint(double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 753 (class 1255 OID 295415)
-- Name: makepoint(double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makepoint(double precision, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makepoint';


ALTER FUNCTION public.makepoint(double precision, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 754 (class 1255 OID 295416)
-- Name: makepointm(double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makepointm(double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makepoint3dm';


ALTER FUNCTION public.makepointm(double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 755 (class 1255 OID 295417)
-- Name: makepolygon(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makepolygon(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makepoly';


ALTER FUNCTION public.makepolygon(public.geometry) OWNER TO postgres;

--
-- TOC entry 756 (class 1255 OID 295418)
-- Name: makepolygon(public.geometry, public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.makepolygon(public.geometry, public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makepoly';


ALTER FUNCTION public.makepolygon(public.geometry, public.geometry[]) OWNER TO postgres;

--
-- TOC entry 757 (class 1255 OID 295419)
-- Name: max_distance(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.max_distance(public.geometry, public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_maxdistance2d_linestring';


ALTER FUNCTION public.max_distance(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 758 (class 1255 OID 295420)
-- Name: mem_size(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mem_size(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_mem_size';


ALTER FUNCTION public.mem_size(public.geometry) OWNER TO postgres;

--
-- TOC entry 759 (class 1255 OID 295421)
-- Name: mlinefromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mlinefromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = 'MULTILINESTRING'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mlinefromtext(text) OWNER TO postgres;

--
-- TOC entry 760 (class 1255 OID 295422)
-- Name: mlinefromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mlinefromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE
	WHEN geometrytype(GeomFromText($1, $2)) = 'MULTILINESTRING'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mlinefromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 761 (class 1255 OID 295423)
-- Name: mlinefromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mlinefromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'MULTILINESTRING'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mlinefromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 762 (class 1255 OID 295424)
-- Name: mlinefromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mlinefromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'MULTILINESTRING'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mlinefromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 763 (class 1255 OID 295425)
-- Name: mpointfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpointfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = 'MULTIPOINT'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpointfromtext(text) OWNER TO postgres;

--
-- TOC entry 764 (class 1255 OID 295426)
-- Name: mpointfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpointfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1,$2)) = 'MULTIPOINT'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpointfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 765 (class 1255 OID 295427)
-- Name: mpointfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpointfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'MULTIPOINT'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpointfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 766 (class 1255 OID 295428)
-- Name: mpointfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpointfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1,$2)) = 'MULTIPOINT'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpointfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 767 (class 1255 OID 295429)
-- Name: mpolyfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpolyfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = 'MULTIPOLYGON'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpolyfromtext(text) OWNER TO postgres;

--
-- TOC entry 768 (class 1255 OID 295430)
-- Name: mpolyfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpolyfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = 'MULTIPOLYGON'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpolyfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 769 (class 1255 OID 295431)
-- Name: mpolyfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpolyfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'MULTIPOLYGON'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpolyfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 770 (class 1255 OID 295432)
-- Name: mpolyfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.mpolyfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'MULTIPOLYGON'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.mpolyfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 771 (class 1255 OID 295433)
-- Name: multi(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multi(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_force_multi';


ALTER FUNCTION public.multi(public.geometry) OWNER TO postgres;

--
-- TOC entry 772 (class 1255 OID 295434)
-- Name: multilinefromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multilinefromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'MULTILINESTRING'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.multilinefromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 773 (class 1255 OID 295435)
-- Name: multilinefromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multilinefromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'MULTILINESTRING'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.multilinefromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 774 (class 1255 OID 295436)
-- Name: multilinestringfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multilinestringfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_MLineFromText($1)$_$;


ALTER FUNCTION public.multilinestringfromtext(text) OWNER TO postgres;

--
-- TOC entry 775 (class 1255 OID 295437)
-- Name: multilinestringfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multilinestringfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT MLineFromText($1, $2)$_$;


ALTER FUNCTION public.multilinestringfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 776 (class 1255 OID 295438)
-- Name: multipointfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipointfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT MPointFromText($1)$_$;


ALTER FUNCTION public.multipointfromtext(text) OWNER TO postgres;

--
-- TOC entry 777 (class 1255 OID 295439)
-- Name: multipointfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipointfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT MPointFromText($1, $2)$_$;


ALTER FUNCTION public.multipointfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 778 (class 1255 OID 295440)
-- Name: multipointfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipointfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'MULTIPOINT'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.multipointfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 779 (class 1255 OID 295441)
-- Name: multipointfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipointfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1,$2)) = 'MULTIPOINT'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.multipointfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 780 (class 1255 OID 295442)
-- Name: multipolyfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipolyfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'MULTIPOLYGON'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.multipolyfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 781 (class 1255 OID 295443)
-- Name: multipolyfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipolyfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'MULTIPOLYGON'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.multipolyfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 782 (class 1255 OID 295444)
-- Name: multipolygonfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipolygonfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT MPolyFromText($1)$_$;


ALTER FUNCTION public.multipolygonfromtext(text) OWNER TO postgres;

--
-- TOC entry 783 (class 1255 OID 295445)
-- Name: multipolygonfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.multipolygonfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT MPolyFromText($1, $2)$_$;


ALTER FUNCTION public.multipolygonfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 784 (class 1255 OID 295446)
-- Name: ndims(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ndims(public.geometry) RETURNS smallint
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_ndims';


ALTER FUNCTION public.ndims(public.geometry) OWNER TO postgres;

--
-- TOC entry 785 (class 1255 OID 295447)
-- Name: noop(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.noop(public.geometry) RETURNS public.geometry
    LANGUAGE c STRICT
    AS '$libdir/postgis-3', 'LWGEOM_noop';


ALTER FUNCTION public.noop(public.geometry) OWNER TO postgres;

--
-- TOC entry 786 (class 1255 OID 295448)
-- Name: npoints(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.npoints(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_npoints';


ALTER FUNCTION public.npoints(public.geometry) OWNER TO postgres;

--
-- TOC entry 787 (class 1255 OID 295449)
-- Name: nrings(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.nrings(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_nrings';


ALTER FUNCTION public.nrings(public.geometry) OWNER TO postgres;

--
-- TOC entry 788 (class 1255 OID 295450)
-- Name: numgeometries(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.numgeometries(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_numgeometries_collection';


ALTER FUNCTION public.numgeometries(public.geometry) OWNER TO postgres;

--
-- TOC entry 789 (class 1255 OID 295451)
-- Name: numinteriorring(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.numinteriorring(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_numinteriorrings_polygon';


ALTER FUNCTION public.numinteriorring(public.geometry) OWNER TO postgres;

--
-- TOC entry 790 (class 1255 OID 295452)
-- Name: numinteriorrings(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.numinteriorrings(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_numinteriorrings_polygon';


ALTER FUNCTION public.numinteriorrings(public.geometry) OWNER TO postgres;

--
-- TOC entry 791 (class 1255 OID 295453)
-- Name: numpoints(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.numpoints(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_numpoints_linestring';


ALTER FUNCTION public.numpoints(public.geometry) OWNER TO postgres;

--
-- TOC entry 792 (class 1255 OID 295454)
-- Name: overlaps(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."overlaps"(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'overlaps';


ALTER FUNCTION public."overlaps"(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 803 (class 1255 OID 295465)
-- Name: perimeter2d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.perimeter2d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_perimeter2d_poly';


ALTER FUNCTION public.perimeter2d(public.geometry) OWNER TO postgres;

--
-- TOC entry 804 (class 1255 OID 295466)
-- Name: perimeter3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.perimeter3d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_perimeter_poly';


ALTER FUNCTION public.perimeter3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 827 (class 1255 OID 295489)
-- Name: point_inside_circle(public.geometry, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.point_inside_circle(public.geometry, double precision, double precision, double precision) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_inside_circle_point';


ALTER FUNCTION public.point_inside_circle(public.geometry, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 828 (class 1255 OID 295490)
-- Name: pointfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pointfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = 'POINT'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.pointfromtext(text) OWNER TO postgres;

--
-- TOC entry 829 (class 1255 OID 295491)
-- Name: pointfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pointfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = 'POINT'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.pointfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 830 (class 1255 OID 295492)
-- Name: pointfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pointfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'POINT'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.pointfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 831 (class 1255 OID 295493)
-- Name: pointfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pointfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = 'POINT'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.pointfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 832 (class 1255 OID 295494)
-- Name: pointn(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pointn(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_pointn_linestring';


ALTER FUNCTION public.pointn(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 833 (class 1255 OID 295495)
-- Name: pointonsurface(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pointonsurface(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'pointonsurface';


ALTER FUNCTION public.pointonsurface(public.geometry) OWNER TO postgres;

--
-- TOC entry 834 (class 1255 OID 295496)
-- Name: polyfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polyfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = 'POLYGON'
	THEN GeomFromText($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.polyfromtext(text) OWNER TO postgres;

--
-- TOC entry 835 (class 1255 OID 295497)
-- Name: polyfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polyfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = 'POLYGON'
	THEN GeomFromText($1,$2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.polyfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 836 (class 1255 OID 295498)
-- Name: polyfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polyfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'POLYGON'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.polyfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 837 (class 1255 OID 295499)
-- Name: polyfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polyfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = 'POLYGON'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.polyfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 839 (class 1255 OID 295501)
-- Name: polygonfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polygonfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT PolyFromText($1)$_$;


ALTER FUNCTION public.polygonfromtext(text) OWNER TO postgres;

--
-- TOC entry 840 (class 1255 OID 295502)
-- Name: polygonfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polygonfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT PolyFromText($1, $2)$_$;


ALTER FUNCTION public.polygonfromtext(text, integer) OWNER TO postgres;

--
-- TOC entry 841 (class 1255 OID 295503)
-- Name: polygonfromwkb(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polygonfromwkb(bytea) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = 'POLYGON'
	THEN GeomFromWKB($1)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.polygonfromwkb(bytea) OWNER TO postgres;

--
-- TOC entry 842 (class 1255 OID 295504)
-- Name: polygonfromwkb(bytea, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polygonfromwkb(bytea, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT CASE WHEN geometrytype(GeomFromWKB($1,$2)) = 'POLYGON'
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	$_$;


ALTER FUNCTION public.polygonfromwkb(bytea, integer) OWNER TO postgres;

--
-- TOC entry 843 (class 1255 OID 295505)
-- Name: polygonize_garray(public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.polygonize_garray(public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'polygonize_garray';


ALTER FUNCTION public.polygonize_garray(public.geometry[]) OWNER TO postgres;

--
-- TOC entry 882 (class 1255 OID 295545)
-- Name: probe_geometry_columns(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.probe_geometry_columns() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
	inserted integer;
	oldcount integer;
	probed integer;
	stale integer;
BEGIN


	RETURN 'This function is obsolete now that geometry_columns is a view';
END

$$;


ALTER FUNCTION public.probe_geometry_columns() OWNER TO postgres;

--
-- TOC entry 900 (class 1255 OID 295563)
-- Name: relate(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.relate(public.geometry, public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'relate_full';


ALTER FUNCTION public.relate(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 901 (class 1255 OID 295564)
-- Name: relate(public.geometry, public.geometry, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.relate(public.geometry, public.geometry, text) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'relate_pattern';


ALTER FUNCTION public.relate(public.geometry, public.geometry, text) OWNER TO postgres;

--
-- TOC entry 902 (class 1255 OID 295565)
-- Name: removepoint(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.removepoint(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_removepoint';


ALTER FUNCTION public.removepoint(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 903 (class 1255 OID 295566)
-- Name: rename_geometry_table_constraints(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rename_geometry_table_constraints() RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT 'rename_geometry_table_constraint() is obsoleted'::text
$$;


ALTER FUNCTION public.rename_geometry_table_constraints() OWNER TO postgres;

--
-- TOC entry 904 (class 1255 OID 295567)
-- Name: reverse(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.reverse(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_reverse';


ALTER FUNCTION public.reverse(public.geometry) OWNER TO postgres;

--
-- TOC entry 905 (class 1255 OID 295568)
-- Name: rotate(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rotate(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_rotateZ($1, $2)$_$;


ALTER FUNCTION public.rotate(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 906 (class 1255 OID 295569)
-- Name: rotatex(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rotatex(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1, 1, 0, 0, 0, cos($2), -sin($2), 0, sin($2), cos($2), 0, 0, 0)$_$;


ALTER FUNCTION public.rotatex(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 907 (class 1255 OID 295570)
-- Name: rotatey(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rotatey(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1,  cos($2), 0, sin($2),  0, 1, 0,  -sin($2), 0, cos($2), 0,  0, 0)$_$;


ALTER FUNCTION public.rotatey(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 908 (class 1255 OID 295571)
-- Name: rotatez(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rotatez(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1,  cos($2), -sin($2), 0,  sin($2), cos($2), 0,  0, 0, 1,  0, 0, 0)$_$;


ALTER FUNCTION public.rotatez(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 909 (class 1255 OID 295572)
-- Name: scale(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.scale(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_scale($1, $2, $3, 1)$_$;


ALTER FUNCTION public.scale(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 910 (class 1255 OID 295573)
-- Name: scale(public.geometry, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.scale(public.geometry, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1,  $2, 0, 0,  0, $3, 0,  0, 0, $4,  0, 0, 0)$_$;


ALTER FUNCTION public.scale(public.geometry, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 911 (class 1255 OID 295574)
-- Name: se_envelopesintersect(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_envelopesintersect(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	SELECT $1 && $2
	$_$;


ALTER FUNCTION public.se_envelopesintersect(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 912 (class 1255 OID 295575)
-- Name: se_is3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_is3d(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_hasz';


ALTER FUNCTION public.se_is3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 913 (class 1255 OID 295576)
-- Name: se_ismeasured(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_ismeasured(public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_hasm';


ALTER FUNCTION public.se_ismeasured(public.geometry) OWNER TO postgres;

--
-- TOC entry 914 (class 1255 OID 295577)
-- Name: se_locatealong(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_locatealong(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT SE_LocateBetween($1, $2, $2) $_$;


ALTER FUNCTION public.se_locatealong(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 915 (class 1255 OID 295578)
-- Name: se_locatebetween(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_locatebetween(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_locate_between_m';


ALTER FUNCTION public.se_locatebetween(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 916 (class 1255 OID 295579)
-- Name: se_m(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_m(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_m_point';


ALTER FUNCTION public.se_m(public.geometry) OWNER TO postgres;

--
-- TOC entry 917 (class 1255 OID 295580)
-- Name: se_z(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.se_z(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_z_point';


ALTER FUNCTION public.se_z(public.geometry) OWNER TO postgres;

--
-- TOC entry 918 (class 1255 OID 295581)
-- Name: segmentize(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.segmentize(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_segmentize2d';


ALTER FUNCTION public.segmentize(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 920 (class 1255 OID 295583)
-- Name: setpoint(public.geometry, integer, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.setpoint(public.geometry, integer, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_setpoint_linestring';


ALTER FUNCTION public.setpoint(public.geometry, integer, public.geometry) OWNER TO postgres;

--
-- TOC entry 921 (class 1255 OID 295584)
-- Name: setsrid(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.setsrid(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_set_srid';


ALTER FUNCTION public.setsrid(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 922 (class 1255 OID 295585)
-- Name: shift_longitude(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.shift_longitude(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_longitude_shift';


ALTER FUNCTION public.shift_longitude(public.geometry) OWNER TO postgres;

--
-- TOC entry 928 (class 1255 OID 295591)
-- Name: simplify(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.simplify(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_simplify2d';


ALTER FUNCTION public.simplify(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 929 (class 1255 OID 295592)
-- Name: snaptogrid(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.snaptogrid(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_SnapToGrid($1, 0, 0, $2, $2)$_$;


ALTER FUNCTION public.snaptogrid(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 930 (class 1255 OID 295593)
-- Name: snaptogrid(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.snaptogrid(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_SnapToGrid($1, 0, 0, $2, $3)$_$;


ALTER FUNCTION public.snaptogrid(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 931 (class 1255 OID 295594)
-- Name: snaptogrid(public.geometry, double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.snaptogrid(public.geometry, double precision, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_snaptogrid';


ALTER FUNCTION public.snaptogrid(public.geometry, double precision, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 932 (class 1255 OID 295595)
-- Name: snaptogrid(public.geometry, public.geometry, double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.snaptogrid(public.geometry, public.geometry, double precision, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_snaptogrid_pointoff';


ALTER FUNCTION public.snaptogrid(public.geometry, public.geometry, double precision, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 933 (class 1255 OID 295596)
-- Name: srid(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.srid(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_get_srid';


ALTER FUNCTION public.srid(public.geometry) OWNER TO postgres;

--
-- TOC entry 940 (class 1255 OID 295603)
-- Name: st_3dlength_spheroid(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_3dlength_spheroid(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LengthSpheroid($1,$2);$_$;


ALTER FUNCTION public.st_3dlength_spheroid(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 1023 (class 1255 OID 295674)
-- Name: st_asbinary(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_asbinary(text) RETURNS bytea
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsBinary($1::geometry);$_$;


ALTER FUNCTION public.st_asbinary(text) OWNER TO postgres;

--
-- TOC entry 1039 (class 1255 OID 295690)
-- Name: st_asgeojson(integer, public.geography, integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_asgeojson(version integer, geog public.geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsGeoJson($2::geometry,$3,$4); $_$;


ALTER FUNCTION public.st_asgeojson(version integer, geog public.geography, maxdecimaldigits integer, options integer) OWNER TO postgres;

--
-- TOC entry 998 (class 1255 OID 295691)
-- Name: st_asgeojson(integer, public.geometry, integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_asgeojson(version integer, geog public.geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsGeoJson($2::geometry,15,0); $_$;


ALTER FUNCTION public.st_asgeojson(version integer, geog public.geometry, maxdecimaldigits integer, options integer) OWNER TO postgres;

--
-- TOC entry 1053 (class 1255 OID 295709)
-- Name: st_askml(integer, public.geography, integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_askml(version integer, geom public.geography, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT ''::text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsKML($2::geometry,$3,$4); $_$;


ALTER FUNCTION public.st_askml(version integer, geom public.geography, maxdecimaldigits integer, nprefix text) OWNER TO postgres;

--
-- TOC entry 1054 (class 1255 OID 295710)
-- Name: st_askml(integer, public.geometry, integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_askml(version integer, geom public.geometry, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT ''::text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsKML($2::geometry,$3,$4); $_$;


ALTER FUNCTION public.st_askml(version integer, geom public.geometry, maxdecimaldigits integer, nprefix text) OWNER TO postgres;

--
-- TOC entry 1099 (class 1255 OID 295733)
-- Name: st_astext(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_astext(bytea) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsText($1::geometry);$_$;


ALTER FUNCTION public.st_astext(bytea) OWNER TO postgres;

--
-- TOC entry 1089 (class 1255 OID 295765)
-- Name: st_box(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box(public.box3d) RETURNS box
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_to_BOX';


ALTER FUNCTION public.st_box(public.box3d) OWNER TO postgres;

--
-- TOC entry 1090 (class 1255 OID 295766)
-- Name: st_box(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box(public.geometry) RETURNS box
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_to_BOX';


ALTER FUNCTION public.st_box(public.geometry) OWNER TO postgres;

--
-- TOC entry 1091 (class 1255 OID 295767)
-- Name: st_box2d(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box2d(public.box3d) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_to_BOX2D';


ALTER FUNCTION public.st_box2d(public.box3d) OWNER TO postgres;

--
-- TOC entry 1092 (class 1255 OID 295768)
-- Name: st_box2d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box2d(public.geometry) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_to_BOX2D';


ALTER FUNCTION public.st_box2d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1106 (class 1255 OID 295770)
-- Name: st_box3d(public.box2d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box3d(public.box2d) RETURNS public.box3d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX2D_to_BOX3D';


ALTER FUNCTION public.st_box3d(public.box2d) OWNER TO postgres;

--
-- TOC entry 1107 (class 1255 OID 295771)
-- Name: st_box3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box3d(public.geometry) RETURNS public.box3d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_to_BOX3D';


ALTER FUNCTION public.st_box3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1108 (class 1255 OID 295772)
-- Name: st_box3d_in(cstring); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box3d_in(cstring) RETURNS public.box3d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_in';


ALTER FUNCTION public.st_box3d_in(cstring) OWNER TO postgres;

--
-- TOC entry 1109 (class 1255 OID 295773)
-- Name: st_box3d_out(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_box3d_out(public.box3d) RETURNS cstring
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_out';


ALTER FUNCTION public.st_box3d_out(public.box3d) OWNER TO postgres;

--
-- TOC entry 1057 (class 1255 OID 295783)
-- Name: st_bytea(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_bytea(public.geometry) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_to_bytea';


ALTER FUNCTION public.st_bytea(public.geometry) OWNER TO postgres;

--
-- TOC entry 1151 (class 1255 OID 295808)
-- Name: st_combine_bbox(public.box2d, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_combine_bbox(public.box2d, public.geometry) RETURNS public.box2d
    LANGUAGE sql IMMUTABLE
    AS $_$SELECT ST_CombineBbox($1,$2);$_$;


ALTER FUNCTION public.st_combine_bbox(public.box2d, public.geometry) OWNER TO postgres;

--
-- TOC entry 1152 (class 1255 OID 295809)
-- Name: st_combine_bbox(public.box3d, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_combine_bbox(public.box3d, public.geometry) RETURNS public.box3d
    LANGUAGE sql IMMUTABLE
    AS $_$SELECT ST_CombineBbox($1,$2);$_$;


ALTER FUNCTION public.st_combine_bbox(public.box3d, public.geometry) OWNER TO postgres;

--
-- TOC entry 1191 (class 1255 OID 295854)
-- Name: st_distance_sphere(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_distance_sphere(geom1 public.geometry, geom2 public.geometry) RETURNS double precision
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_DistanceSphere($1,$2);$_$;


ALTER FUNCTION public.st_distance_sphere(geom1 public.geometry, geom2 public.geometry) OWNER TO postgres;

--
-- TOC entry 1192 (class 1255 OID 295855)
-- Name: st_distance_spheroid(public.geometry, public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_distance_spheroid(geom1 public.geometry, geom2 public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_DistanceSpheroid($1,$2,$3);$_$;


ALTER FUNCTION public.st_distance_spheroid(geom1 public.geometry, geom2 public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 1214 (class 1255 OID 295876)
-- Name: st_estimated_extent(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_estimated_extent(text, text) RETURNS public.box2d
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	-- We use security invoker instead of security definer
	-- to prevent malicious injection of a same named different function
	-- that would be run under elevated permissions
	SELECT ST_EstimatedExtent($1, $2);
	$_$;


ALTER FUNCTION public.st_estimated_extent(text, text) OWNER TO postgres;

--
-- TOC entry 1215 (class 1255 OID 295877)
-- Name: st_estimated_extent(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_estimated_extent(text, text, text) RETURNS public.box2d
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
	-- We use security invoker instead of security definer
	-- to prevent malicious injection of a different same named function
	SELECT ST_EstimatedExtent($1, $2, $3);
	$_$;


ALTER FUNCTION public.st_estimated_extent(text, text, text) OWNER TO postgres;

--
-- TOC entry 1227 (class 1255 OID 295889)
-- Name: st_find_extent(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_find_extent(text, text) RETURNS public.box2d
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_FindExtent($1,$2);$_$;


ALTER FUNCTION public.st_find_extent(text, text) OWNER TO postgres;

--
-- TOC entry 1228 (class 1255 OID 295890)
-- Name: st_find_extent(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_find_extent(text, text, text) RETURNS public.box2d
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_FindExtent($1,$2,$3);$_$;


ALTER FUNCTION public.st_find_extent(text, text, text) OWNER TO postgres;

--
-- TOC entry 1235 (class 1255 OID 295899)
-- Name: st_force_2d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_force_2d(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Force2D($1);$_$;


ALTER FUNCTION public.st_force_2d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1236 (class 1255 OID 295900)
-- Name: st_force_3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_force_3d(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Force3D($1);$_$;


ALTER FUNCTION public.st_force_3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1237 (class 1255 OID 295901)
-- Name: st_force_3dm(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_force_3dm(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Force3DM($1);$_$;


ALTER FUNCTION public.st_force_3dm(public.geometry) OWNER TO postgres;

--
-- TOC entry 1238 (class 1255 OID 295902)
-- Name: st_force_3dz(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_force_3dz(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Force3DZ($1);$_$;


ALTER FUNCTION public.st_force_3dz(public.geometry) OWNER TO postgres;

--
-- TOC entry 1239 (class 1255 OID 295903)
-- Name: st_force_4d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_force_4d(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Force4D($1);$_$;


ALTER FUNCTION public.st_force_4d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1240 (class 1255 OID 295904)
-- Name: st_force_collection(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_force_collection(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_ForceCollection($1);$_$;


ALTER FUNCTION public.st_force_collection(public.geometry) OWNER TO postgres;

--
-- TOC entry 1264 (class 1255 OID 295927)
-- Name: st_geometry(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry(bytea) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_from_bytea';


ALTER FUNCTION public.st_geometry(bytea) OWNER TO postgres;

--
-- TOC entry 1265 (class 1255 OID 295928)
-- Name: st_geometry(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry(text) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'parse_WKT_lwgeom';


ALTER FUNCTION public.st_geometry(text) OWNER TO postgres;

--
-- TOC entry 1266 (class 1255 OID 295929)
-- Name: st_geometry(public.box2d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry(public.box2d) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX2D_to_LWGEOM';


ALTER FUNCTION public.st_geometry(public.box2d) OWNER TO postgres;

--
-- TOC entry 1267 (class 1255 OID 295930)
-- Name: st_geometry(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry(public.box3d) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_to_LWGEOM';


ALTER FUNCTION public.st_geometry(public.box3d) OWNER TO postgres;

--
-- TOC entry 1268 (class 1255 OID 295931)
-- Name: st_geometry_cmp(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry_cmp(public.geometry, public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'lwgeom_cmp';


ALTER FUNCTION public.st_geometry_cmp(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1269 (class 1255 OID 295932)
-- Name: st_geometry_eq(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry_eq(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'lwgeom_eq';


ALTER FUNCTION public.st_geometry_eq(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1270 (class 1255 OID 295933)
-- Name: st_geometry_ge(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry_ge(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'lwgeom_ge';


ALTER FUNCTION public.st_geometry_ge(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1271 (class 1255 OID 295934)
-- Name: st_geometry_gt(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry_gt(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'lwgeom_gt';


ALTER FUNCTION public.st_geometry_gt(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1272 (class 1255 OID 295935)
-- Name: st_geometry_le(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry_le(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'lwgeom_le';


ALTER FUNCTION public.st_geometry_le(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1273 (class 1255 OID 295936)
-- Name: st_geometry_lt(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_geometry_lt(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'lwgeom_lt';


ALTER FUNCTION public.st_geometry_lt(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1356 (class 1255 OID 296022)
-- Name: st_length2d_spheroid(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_length2d_spheroid(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Length2DSpheroid($1,$2);$_$;


ALTER FUNCTION public.st_length2d_spheroid(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 1358 (class 1255 OID 296024)
-- Name: st_length3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_length3d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_length_linestring';


ALTER FUNCTION public.st_length3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1359 (class 1255 OID 296025)
-- Name: st_length_spheroid(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_length_spheroid(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LengthSpheroid($1,$2);$_$;


ALTER FUNCTION public.st_length_spheroid(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 1360 (class 1255 OID 296026)
-- Name: st_length_spheroid3d(public.geometry, public.spheroid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_length_spheroid3d(public.geometry, public.spheroid) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'LWGEOM_length_ellipsoid_linestring';


ALTER FUNCTION public.st_length_spheroid3d(public.geometry, public.spheroid) OWNER TO postgres;

--
-- TOC entry 1362 (class 1255 OID 296028)
-- Name: st_line_interpolate_point(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_line_interpolate_point(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LineInterpolatePoint($1, $2);$_$;


ALTER FUNCTION public.st_line_interpolate_point(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 1363 (class 1255 OID 296029)
-- Name: st_line_locate_point(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_line_locate_point(geom1 public.geometry, geom2 public.geometry) RETURNS double precision
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LineLocatePoint($1, $2);$_$;


ALTER FUNCTION public.st_line_locate_point(geom1 public.geometry, geom2 public.geometry) OWNER TO postgres;

--
-- TOC entry 1364 (class 1255 OID 296030)
-- Name: st_line_substring(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_line_substring(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LineSubstring($1, $2, $3);$_$;


ALTER FUNCTION public.st_line_substring(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 1380 (class 1255 OID 296046)
-- Name: st_locate_along_measure(public.geometry, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_locate_along_measure(public.geometry, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LocateBetween($1, $2, $2);$_$;


ALTER FUNCTION public.st_locate_along_measure(public.geometry, double precision) OWNER TO postgres;

--
-- TOC entry 1381 (class 1255 OID 296047)
-- Name: st_locate_between_measures(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_locate_between_measures(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_LocateBetween($1, $2, $2);$_$;


ALTER FUNCTION public.st_locate_between_measures(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 1388 (class 1255 OID 296054)
-- Name: st_makebox3d(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_makebox3d(public.geometry, public.geometry) RETURNS public.box3d
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_construct';


ALTER FUNCTION public.st_makebox3d(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1396 (class 1255 OID 296062)
-- Name: st_makeline_garray(public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_makeline_garray(public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_makeline_garray';


ALTER FUNCTION public.st_makeline_garray(public.geometry[]) OWNER TO postgres;

--
-- TOC entry 1460 (class 1255 OID 296099)
-- Name: st_mem_size(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_mem_size(public.geometry) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_MemSize($1);$_$;


ALTER FUNCTION public.st_mem_size(public.geometry) OWNER TO postgres;

--
-- TOC entry 1508 (class 1255 OID 296165)
-- Name: st_perimeter3d(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_perimeter3d(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_perimeter_poly';


ALTER FUNCTION public.st_perimeter3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 1519 (class 1255 OID 296179)
-- Name: st_point_inside_circle(public.geometry, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_point_inside_circle(public.geometry, double precision, double precision, double precision) RETURNS boolean
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_PointInsideCircle($1,$2,$3,$4);$_$;


ALTER FUNCTION public.st_point_inside_circle(public.geometry, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 1540 (class 1255 OID 296200)
-- Name: st_polygonize_garray(public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_polygonize_garray(public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT COST 100
    AS '$libdir/postgis-3', 'polygonize_garray';


ALTER FUNCTION public.st_polygonize_garray(public.geometry[]) OWNER TO postgres;

--
-- TOC entry 1583 (class 1255 OID 296296)
-- Name: st_shift_longitude(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_shift_longitude(public.geometry) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_ShiftLongitude($1);$_$;


ALTER FUNCTION public.st_shift_longitude(public.geometry) OWNER TO postgres;

--
-- TOC entry 1684 (class 1255 OID 296335)
-- Name: st_text(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_text(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_to_text';


ALTER FUNCTION public.st_text(public.geometry) OWNER TO postgres;

--
-- TOC entry 1704 (class 1255 OID 296361)
-- Name: st_unite_garray(public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_unite_garray(public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'pgis_union_geometry_array';


ALTER FUNCTION public.st_unite_garray(public.geometry[]) OWNER TO postgres;

--
-- TOC entry 1757 (class 1255 OID 296419)
-- Name: startpoint(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.startpoint(public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_startpoint_linestring';


ALTER FUNCTION public.startpoint(public.geometry) OWNER TO postgres;

--
-- TOC entry 1758 (class 1255 OID 296420)
-- Name: summary(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.summary(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_summary';


ALTER FUNCTION public.summary(public.geometry) OWNER TO postgres;

--
-- TOC entry 1759 (class 1255 OID 296421)
-- Name: symdifference(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.symdifference(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'symdifference';


ALTER FUNCTION public.symdifference(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1760 (class 1255 OID 296422)
-- Name: symmetricdifference(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.symmetricdifference(public.geometry, public.geometry) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'symdifference';


ALTER FUNCTION public.symmetricdifference(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1762 (class 1255 OID 296424)
-- Name: touches(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.touches(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'touches';


ALTER FUNCTION public.touches(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1763 (class 1255 OID 296425)
-- Name: transform(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.transform(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'transform';


ALTER FUNCTION public.transform(public.geometry, integer) OWNER TO postgres;

--
-- TOC entry 1764 (class 1255 OID 296426)
-- Name: translate(public.geometry, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.translate(public.geometry, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_translate($1, $2, $3, 0)$_$;


ALTER FUNCTION public.translate(public.geometry, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 1765 (class 1255 OID 296427)
-- Name: translate(public.geometry, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.translate(public.geometry, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1, 1, 0, 0, 0, 1, 0, 0, 0, 1, $2, $3, $4)$_$;


ALTER FUNCTION public.translate(public.geometry, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 1657 (class 1255 OID 296428)
-- Name: transscale(public.geometry, double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.transscale(public.geometry, double precision, double precision, double precision, double precision) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT st_affine($1,  $4, 0, 0,  0, $5, 0,
		0, 0, 1,  $2 * $4, $3 * $5, 0)$_$;


ALTER FUNCTION public.transscale(public.geometry, double precision, double precision, double precision, double precision) OWNER TO postgres;

--
-- TOC entry 1658 (class 1255 OID 296429)
-- Name: unite_garray(public.geometry[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.unite_garray(public.geometry[]) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'pgis_union_geometry_array';


ALTER FUNCTION public.unite_garray(public.geometry[]) OWNER TO postgres;

--
-- TOC entry 1772 (class 1255 OID 296436)
-- Name: within(public.geometry, public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.within(public.geometry, public.geometry) RETURNS boolean
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_Within($1, $2)$_$;


ALTER FUNCTION public.within(public.geometry, public.geometry) OWNER TO postgres;

--
-- TOC entry 1773 (class 1255 OID 296437)
-- Name: x(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.x(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_x_point';


ALTER FUNCTION public.x(public.geometry) OWNER TO postgres;

--
-- TOC entry 1774 (class 1255 OID 296438)
-- Name: xmax(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.xmax(public.box3d) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_xmax';


ALTER FUNCTION public.xmax(public.box3d) OWNER TO postgres;

--
-- TOC entry 1775 (class 1255 OID 296439)
-- Name: xmin(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.xmin(public.box3d) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_xmin';


ALTER FUNCTION public.xmin(public.box3d) OWNER TO postgres;

--
-- TOC entry 1776 (class 1255 OID 296440)
-- Name: y(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.y(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_y_point';


ALTER FUNCTION public.y(public.geometry) OWNER TO postgres;

--
-- TOC entry 1777 (class 1255 OID 296441)
-- Name: ymax(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ymax(public.box3d) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_ymax';


ALTER FUNCTION public.ymax(public.box3d) OWNER TO postgres;

--
-- TOC entry 1778 (class 1255 OID 296442)
-- Name: ymin(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ymin(public.box3d) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_ymin';


ALTER FUNCTION public.ymin(public.box3d) OWNER TO postgres;

--
-- TOC entry 1779 (class 1255 OID 296443)
-- Name: z(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.z(public.geometry) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_z_point';


ALTER FUNCTION public.z(public.geometry) OWNER TO postgres;

--
-- TOC entry 1780 (class 1255 OID 296444)
-- Name: zmax(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.zmax(public.box3d) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_zmax';


ALTER FUNCTION public.zmax(public.box3d) OWNER TO postgres;

--
-- TOC entry 1781 (class 1255 OID 296445)
-- Name: zmflag(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.zmflag(public.geometry) RETURNS smallint
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_zmflag';


ALTER FUNCTION public.zmflag(public.geometry) OWNER TO postgres;

--
-- TOC entry 1782 (class 1255 OID 296446)
-- Name: zmin(public.box3d); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.zmin(public.box3d) RETURNS double precision
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'BOX3D_zmin';


ALTER FUNCTION public.zmin(public.box3d) OWNER TO postgres;

--
-- TOC entry 2474 (class 1255 OID 296539)
-- Name: extent(public.geometry); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.extent(public.geometry) (
    SFUNC = public.st_combinebbox,
    STYPE = public.box3d,
    FINALFUNC = public.box2d
);


ALTER AGGREGATE public.extent(public.geometry) OWNER TO postgres;

--
-- TOC entry 2475 (class 1255 OID 296540)
-- Name: extent3d(public.geometry); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.extent3d(public.geometry) (
    SFUNC = public.combine_bbox,
    STYPE = public.box3d
);


ALTER AGGREGATE public.extent3d(public.geometry) OWNER TO postgres;

--
-- TOC entry 2476 (class 1255 OID 296541)
-- Name: makeline(public.geometry); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.makeline(public.geometry) (
    SFUNC = public.pgis_geometry_accum_transfn,
    STYPE = internal,
    FINALFUNC = public.pgis_geometry_makeline_finalfn
);


ALTER AGGREGATE public.makeline(public.geometry) OWNER TO postgres;

--
-- TOC entry 2477 (class 1255 OID 296542)
-- Name: memcollect(public.geometry); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.memcollect(public.geometry) (
    SFUNC = public.st_collect,
    STYPE = public.geometry
);


ALTER AGGREGATE public.memcollect(public.geometry) OWNER TO postgres;

--
-- TOC entry 2470 (class 1255 OID 296543)
-- Name: memgeomunion(public.geometry); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.memgeomunion(public.geometry) (
    SFUNC = public.geomunion,
    STYPE = public.geometry
);


ALTER AGGREGATE public.memgeomunion(public.geometry) OWNER TO postgres;

--
-- TOC entry 2458 (class 1255 OID 296559)
-- Name: st_extent3d(public.geometry); Type: AGGREGATE; Schema: public; Owner: postgres
--

CREATE AGGREGATE public.st_extent3d(public.geometry) (
    SFUNC = public.st_combinebbox,
    STYPE = public.box3d
);


ALTER AGGREGATE public.st_extent3d(public.geometry) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 130704429)
-- Name: address_filter_tmp; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.address_filter_tmp (
    id integer NOT NULL,
    geom public.geometry(Point,3003),
    address text
);


ALTER TABLE public.address_filter_tmp OWNER TO webpaper;

--
-- TOC entry 231 (class 1259 OID 130704435)
-- Name: address_filter_tmp_id_seq; Type: SEQUENCE; Schema: public; Owner: webpaper
--

CREATE SEQUENCE public.address_filter_tmp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_filter_tmp_id_seq OWNER TO webpaper;

--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 231
-- Name: address_filter_tmp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webpaper
--

ALTER SEQUENCE public.address_filter_tmp_id_seq OWNED BY public.address_filter_tmp.id;


--
-- TOC entry 232 (class 1259 OID 130704437)
-- Name: areas; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.areas (
    id integer NOT NULL,
    name character varying(100),
    value_it character varying(100),
    value_en character varying(100)
);


ALTER TABLE public.areas OWNER TO webpaper;

--
-- TOC entry 233 (class 1259 OID 130704440)
-- Name: confini_cmve; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.confini_cmve (
    id integer NOT NULL,
    geom public.geometry(MultiPolygon,3003),
    area double precision,
    perimeter double precision,
    codistat character varying(6),
    provincia character varying(2),
    nome character varying(7)
);


ALTER TABLE public.confini_cmve OWNER TO webpaper;

--
-- TOC entry 234 (class 1259 OID 130704446)
-- Name: devices; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.devices (
    id integer NOT NULL,
    device_key character varying(250) NOT NULL,
    platform character varying(50) NOT NULL,
    language character varying(50) NOT NULL,
    enabled smallint NOT NULL,
    "timestamp" timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.devices OWNER TO webpaper;

--
-- TOC entry 235 (class 1259 OID 130704449)
-- Name: devices_id_seq; Type: SEQUENCE; Schema: public; Owner: webpaper
--

CREATE SEQUENCE public.devices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.devices_id_seq OWNER TO webpaper;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 235
-- Name: devices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webpaper
--

ALTER SEQUENCE public.devices_id_seq OWNED BY public.devices.id;


--
-- TOC entry 251 (class 1259 OID 133506833)
-- Name: devices_new; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.devices_new (
    enabled smallint,
    id integer NOT NULL,
    device_key character varying(250),
    platform character varying(50),
    language character varying(50),
    "timestamp" timestamp without time zone
);


ALTER TABLE public.devices_new OWNER TO webpaper;

--
-- TOC entry 250 (class 1259 OID 133506831)
-- Name: devices_new_id_seq; Type: SEQUENCE; Schema: public; Owner: webpaper
--

CREATE SEQUENCE public.devices_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.devices_new_id_seq OWNER TO webpaper;

--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 250
-- Name: devices_new_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webpaper
--

ALTER SEQUENCE public.devices_new_id_seq OWNED BY public.devices_new.id;


--
-- TOC entry 236 (class 1259 OID 130704451)
-- Name: layers; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.layers (
    id integer NOT NULL,
    id_area integer,
    name character varying(100),
    value_it character varying(100),
    value_en character varying(100),
    layer_name character varying(100),
    descr_1 character varying(50),
    descr_2 character varying(1000),
    def_id_layer character varying(10)
);


ALTER TABLE public.layers OWNER TO webpaper;

--
-- TOC entry 253 (class 1259 OID 190763453)
-- Name: limtraf_ecologica; Type: TABLE; Schema: public; Owner: situser
--

CREATE TABLE public.limtraf_ecologica (
    codistat integer NOT NULL,
    geom public.geometry(MultiPolygon,3003),
    nome_comune character varying(72),
    date character varying(300),
    testo character varying(400),
    x_min double precision,
    x_max double precision,
    y_min double precision,
    y_max double precision
);


ALTER TABLE public.limtraf_ecologica OWNER TO situser;

--
-- TOC entry 237 (class 1259 OID 130704457)
-- Name: limtraf_grafostrade_cmve; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.limtraf_grafostrade_cmve (
    fid bigint,
    geom public.geometry(MultiLineString,3003),
    denom character varying(100),
    tipo character varying(100),
    codistat character varying(10)
);


ALTER TABLE public.limtraf_grafostrade_cmve OWNER TO webpaper;

--
-- TOC entry 238 (class 1259 OID 130704463)
-- Name: limtraf_grafostrade_con_limitazione; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.limtraf_grafostrade_con_limitazione (
    fid bigint,
    geom public.geometry(MultiLineString,3003),
    denom character varying(100),
    tipo character varying(100),
    codistat character varying(10)
);


ALTER TABLE public.limtraf_grafostrade_con_limitazione OWNER TO webpaper;

--
-- TOC entry 239 (class 1259 OID 130704469)
-- Name: messages; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    name character varying(100),
    value_it character varying(100),
    value_en character varying(100),
    send_date date NOT NULL,
    sent_date date,
    processed boolean NOT NULL
);


ALTER TABLE public.messages OWNER TO webpaper;

--
-- TOC entry 240 (class 1259 OID 130704472)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: webpaper
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO webpaper;

--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 240
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webpaper
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 241 (class 1259 OID 130704474)
-- Name: reports; Type: TABLE; Schema: public; Owner: webpaper
--

CREATE TABLE public.reports (
    id integer DEFAULT nextval(('public.reports_id_seq'::text)::regclass) NOT NULL,
    email character varying(100),
    area character varying(50),
    subarea character varying(50),
    text character varying(1000),
    longitude numeric,
    latitude numeric,
    photo_name character varying(50),
    "timestamp" timestamp without time zone,
    userlongitude numeric,
    userlatitude numeric
);


ALTER TABLE public.reports OWNER TO webpaper;

--
-- TOC entry 242 (class 1259 OID 130704481)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: webpaper
--

CREATE SEQUENCE public.reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO webpaper;

--
-- TOC entry 243 (class 1259 OID 130704483)
-- Name: v_codici_livelloallerta; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_codici_livelloallerta AS
 SELECT s.livelloallerta,
    s.livelloallerta_t,
    s.colore,
    s.messaggio,
    s.message
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select livelloallerta, livelloallerta_t, colore, messaggio, message  from limitazioni_traffico.codici_livelloallerta'::text) s(livelloallerta integer, livelloallerta_t character varying(100), colore character varying(10), messaggio character varying(255), message character varying(255));


ALTER TABLE public.v_codici_livelloallerta OWNER TO webpaper;

--
-- TOC entry 244 (class 1259 OID 130704487)
-- Name: v_limtraf_casistiche; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_limtraf_casistiche AS
 SELECT s.fid,
    s.codistat,
    s.nome_comune,
    s.livelloallerta,
    s.veicolo,
    s.alimentazione,
    s.classe,
    s.fasciaoraria,
    s.limitazione
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select fid, codistat, nome_comune, livelloallerta, veicolo, alimentazione, classe, fasciaoraria, limitazione from limitazioni_traffico.limtraf_casistiche'::text) s(fid integer, codistat integer, nome_comune character varying(100), livelloallerta character varying(10), veicolo character varying(100), alimentazione character varying(100), classe character varying(100), fasciaoraria character varying(100), limitazione character varying(100));


ALTER TABLE public.v_limtraf_casistiche OWNER TO webpaper;

--
-- TOC entry 245 (class 1259 OID 130704491)
-- Name: v_limtraf_casistiche_domani; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_limtraf_casistiche_domani AS
 SELECT s.fid,
    s.codistat,
    s.nome_comune,
    s.livelloallerta_domani,
    s.veicolo,
    s.alimentazione,
    s.classe,
    s.fasciaoraria,
    s.limitazione
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select fid, codistat, nome_comune, livelloallerta_domani, veicolo, alimentazione, classe, fasciaoraria, limitazione from limitazioni_traffico.limtraf_casistiche_domani'::text) s(fid integer, codistat integer, nome_comune character varying(100), livelloallerta_domani character varying(10), veicolo character varying(100), alimentazione character varying(100), classe character varying(100), fasciaoraria character varying(100), limitazione character varying(100));


ALTER TABLE public.v_limtraf_casistiche_domani OWNER TO webpaper;

--
-- TOC entry 246 (class 1259 OID 130704495)
-- Name: v_limtraf_casistiche_eng; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_limtraf_casistiche_eng AS
 SELECT s.fid,
    s.codistat,
    s.nome_comune,
    s.livelloallerta,
    s.veicolo,
    s.alimentazione,
    s.classe,
    s.fasciaoraria,
    s.limitazione
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select fid, codistat, nome_comune, livelloallerta, veicolo, alimentazione, classe, fasciaoraria, limitazione from limitazioni_traffico.limtraf_casistiche_eng'::text) s(fid integer, codistat integer, nome_comune character varying(100), livelloallerta character varying(10), veicolo character varying(100), alimentazione character varying(100), classe character varying(100), fasciaoraria character varying(100), limitazione character varying(100));


ALTER TABLE public.v_limtraf_casistiche_eng OWNER TO webpaper;

--
-- TOC entry 247 (class 1259 OID 130704499)
-- Name: v_limtraf_casistiche_eng_domani; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_limtraf_casistiche_eng_domani AS
 SELECT s.fid,
    s.codistat,
    s.nome_comune,
    s.livelloallerta_domani,
    s.veicolo,
    s.alimentazione,
    s.classe,
    s.fasciaoraria,
    s.limitazione
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select fid, codistat, nome_comune, livelloallerta_domani, veicolo, alimentazione, classe, fasciaoraria, limitazione from limitazioni_traffico.limtraf_casistiche_eng_domani'::text) s(fid integer, codistat integer, nome_comune character varying(100), livelloallerta_domani character varying(10), veicolo character varying(100), alimentazione character varying(100), classe character varying(100), fasciaoraria character varying(100), limitazione character varying(100));


ALTER TABLE public.v_limtraf_casistiche_eng_domani OWNER TO webpaper;

--
-- TOC entry 248 (class 1259 OID 130704503)
-- Name: v_limtraf_deroghe; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_limtraf_deroghe AS
 SELECT s.fid,
    s.codistat,
    s.nome_comune,
    s.livelloallerta,
    s.testo
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select fid, codistat, nome_comune, livelloallerta, testo from limitazioni_traffico.limtraf_deroghe_html'::text) s(fid integer, codistat integer, nome_comune character varying(100), livelloallerta character varying(10), testo character varying);


ALTER TABLE public.v_limtraf_deroghe OWNER TO webpaper;

--
-- TOC entry 249 (class 1259 OID 130704507)
-- Name: v_limtraf_livallerta; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_limtraf_livallerta AS
 SELECT s.codistat,
    s.nome_comune,
    s.livallerta,
    s.livallerta_domani,
    s.geom
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select codistat, nome_comune, livallerta, path,livallerta_domani, path_domani, geom  from limitazioni_traffico.v_comuni_livallerta'::text) s(codistat integer, nome_comune character varying(100), livallerta character varying, path character varying(100), livallerta_domani character varying, path_domani character varying(100), geom public.geometry(MultiPolygon,3003));


ALTER TABLE public.v_limtraf_livallerta OWNER TO webpaper;

--
-- TOC entry 252 (class 1259 OID 134678203)
-- Name: v_search_table; Type: VIEW; Schema: public; Owner: webpaper
--

CREATE VIEW public.v_search_table AS
 SELECT s.id,
    s.id_area,
    s.layer_name,
    s.object_id,
    upper((s.descr_1)::text) AS descr_1,
    upper((s.descr_2)::text) AS descr_2,
    s.geom
   FROM public.dblink('host=172.16.100.175 user=webpaper password=Attenti4321$ dbname=gisdb port=5432 options=-csearch_path='::text, 'select id, id_area, layer_name, object_id, descr_1, descr_2, geom from public.search_table'::text) s(id bigint, id_area bigint, layer_name character varying, object_id bigint, descr_1 character varying, descr_2 character varying, geom public.geometry);


ALTER TABLE public.v_search_table OWNER TO webpaper;

--
-- TOC entry 4743 (class 2604 OID 296846)
-- Name: address_filter_tmp id; Type: DEFAULT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.address_filter_tmp ALTER COLUMN id SET DEFAULT nextval('public.address_filter_tmp_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 296847)
-- Name: devices id; Type: DEFAULT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.devices_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 133506836)
-- Name: devices_new id; Type: DEFAULT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.devices_new ALTER COLUMN id SET DEFAULT nextval('public.devices_new_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 296848)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 4759 (class 2606 OID 296850)
-- Name: address_filter_tmp address_filter_tmp_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.address_filter_tmp
    ADD CONSTRAINT address_filter_tmp_pkey PRIMARY KEY (id);


--
-- TOC entry 4761 (class 2606 OID 296851)
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 296852)
-- Name: confini_cmve confini_cmve_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.confini_cmve
    ADD CONSTRAINT confini_cmve_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 133506838)
-- Name: devices_new devices_new_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.devices_new
    ADD CONSTRAINT devices_new_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 296853)
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 296854)
-- Name: layers layers_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.layers
    ADD CONSTRAINT layers_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 190763457)
-- Name: limtraf_ecologica limtraf_ecologica_pkey; Type: CONSTRAINT; Schema: public; Owner: situser
--

ALTER TABLE ONLY public.limtraf_ecologica
    ADD CONSTRAINT limtraf_ecologica_pkey PRIMARY KEY (codistat);


--
-- TOC entry 4776 (class 2606 OID 296855)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 296856)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: webpaper
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- TOC entry 4769 (class 1259 OID 130704533)
-- Name: limtraf_grafostrade_cmve_codistat_idx; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX limtraf_grafostrade_cmve_codistat_idx ON public.limtraf_grafostrade_cmve USING btree (codistat);


--
-- TOC entry 4770 (class 1259 OID 130704534)
-- Name: limtraf_grafostrade_cmve_geom_idx; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX limtraf_grafostrade_cmve_geom_idx ON public.limtraf_grafostrade_cmve USING gist (geom);


--
-- TOC entry 4771 (class 1259 OID 130704539)
-- Name: limtraf_grafostrade_cmve_tipo_idx; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX limtraf_grafostrade_cmve_tipo_idx ON public.limtraf_grafostrade_cmve USING btree (tipo);


--
-- TOC entry 4772 (class 1259 OID 130704540)
-- Name: limtraf_grafostrade_con_limitazione_codistat_idx; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX limtraf_grafostrade_con_limitazione_codistat_idx ON public.limtraf_grafostrade_con_limitazione USING btree (codistat);


--
-- TOC entry 4773 (class 1259 OID 130704541)
-- Name: limtraf_grafostrade_con_limitazione_geom_idx; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX limtraf_grafostrade_con_limitazione_geom_idx ON public.limtraf_grafostrade_con_limitazione USING gist (geom);


--
-- TOC entry 4774 (class 1259 OID 130704542)
-- Name: limtraf_grafostrade_con_limitazione_tipo_idx; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX limtraf_grafostrade_con_limitazione_tipo_idx ON public.limtraf_grafostrade_con_limitazione USING btree (tipo);


--
-- TOC entry 4764 (class 1259 OID 130704543)
-- Name: sidx_confini_cmve_geom; Type: INDEX; Schema: public; Owner: webpaper
--

CREATE INDEX sidx_confini_cmve_geom ON public.confini_cmve USING gist (geom);


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 8
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO webpaper;
GRANT ALL ON SCHEMA public TO situser;


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 371
-- Name: FUNCTION dblink_connect_u(text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.dblink_connect_u(text) FROM PUBLIC;


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 372
-- Name: FUNCTION dblink_connect_u(text, text); Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON FUNCTION public.dblink_connect_u(text, text) FROM PUBLIC;


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 230
-- Name: TABLE address_filter_tmp; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.address_filter_tmp TO ambiente;


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 232
-- Name: TABLE areas; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.areas TO ambiente;


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 233
-- Name: TABLE confini_cmve; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.confini_cmve TO ambiente;


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 234
-- Name: TABLE devices; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.devices TO ambiente;


--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE geography_columns; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.geography_columns TO PUBLIC;


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 212
-- Name: TABLE geometry_columns; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.geometry_columns TO PUBLIC;


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 236
-- Name: TABLE layers; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.layers TO ambiente;


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 253
-- Name: TABLE limtraf_ecologica; Type: ACL; Schema: public; Owner: situser
--

GRANT SELECT ON TABLE public.limtraf_ecologica TO ambiente;
GRANT ALL ON TABLE public.limtraf_ecologica TO webpaper;


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 237
-- Name: TABLE limtraf_grafostrade_cmve; Type: ACL; Schema: public; Owner: webpaper
--

GRANT ALL ON TABLE public.limtraf_grafostrade_cmve TO situser;
GRANT SELECT ON TABLE public.limtraf_grafostrade_cmve TO ambiente;


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 238
-- Name: TABLE limtraf_grafostrade_con_limitazione; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.limtraf_grafostrade_con_limitazione TO ambiente;


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 239
-- Name: TABLE messages; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.messages TO ambiente;


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 227
-- Name: TABLE raster_columns; Type: ACL; Schema: public; Owner: situser
--

GRANT SELECT ON TABLE public.raster_columns TO PUBLIC;


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 228
-- Name: TABLE raster_overviews; Type: ACL; Schema: public; Owner: situser
--

GRANT SELECT ON TABLE public.raster_overviews TO PUBLIC;


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 241
-- Name: TABLE reports; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.reports TO ambiente;


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE spatial_ref_sys; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.spatial_ref_sys TO PUBLIC;


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 243
-- Name: TABLE v_codici_livelloallerta; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_codici_livelloallerta TO ambiente;


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 244
-- Name: TABLE v_limtraf_casistiche; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_limtraf_casistiche TO ambiente;


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 245
-- Name: TABLE v_limtraf_casistiche_domani; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_limtraf_casistiche_domani TO ambiente;


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 246
-- Name: TABLE v_limtraf_casistiche_eng; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_limtraf_casistiche_eng TO ambiente;


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 247
-- Name: TABLE v_limtraf_casistiche_eng_domani; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_limtraf_casistiche_eng_domani TO ambiente;


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 248
-- Name: TABLE v_limtraf_deroghe; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_limtraf_deroghe TO ambiente;


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 249
-- Name: TABLE v_limtraf_livallerta; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_limtraf_livallerta TO ambiente;


--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 252
-- Name: TABLE v_search_table; Type: ACL; Schema: public; Owner: webpaper
--

GRANT SELECT ON TABLE public.v_search_table TO ambiente;


-- Completed on 2022-09-06 15:54:44 CEST

--
-- PostgreSQL database dump complete
--

