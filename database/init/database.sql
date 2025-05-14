CREATE DATABASE IF NOT EXISTS rasteplassendb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE rasteplassendb;

-- Brukere tabell
CREATE TABLE IF NOT EXISTS brukere (
    bruker_id INT AUTO_INCREMENT PRIMARY KEY,
    brukernavn VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    passord VARCHAR(255) NOT NULL,
    laget DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Rasteplasser tabell
CREATE TABLE IF NOT EXISTS rasteplasser (
    rasteplass_id INT AUTO_INCREMENT PRIMARY KEY,
    vegvesen_id INT,
    geo_kommune VARCHAR(100),
    geo_fylke VARCHAR(100),
    rasteplass_navn VARCHAR(200) NOT NULL,
    rasteplass_type VARCHAR(50),
    rasteplass_lat DECIMAL(9,6) NOT NULL,
    rasteplass_long DECIMAL(9,6) NOT NULL,
    rasteplass_toalett TINYINT(1) DEFAULT 0,
    rasteplass_tilgjengelig TINYINT(1) DEFAULT 1,
    rasteplass_informasjon TEXT,
    rasteplass_renovasjon VARCHAR(255),
    laget DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    oppdatert DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Rasteplasser forslag tabell
CREATE TABLE IF NOT EXISTS rasteplasser_forslag (
    forslag_id INT AUTO_INCREMENT PRIMARY KEY,
    vegvesen_id INT,
    geo_kommune VARCHAR(100),
    geo_fylke VARCHAR(100),
    rasteplass_navn VARCHAR(200) NOT NULL,
    rasteplass_type VARCHAR(50),
    rasteplass_lat DECIMAL(9,6) NOT NULL,
    rasteplass_long DECIMAL(9,6) NOT NULL,
    rasteplass_toalett TINYINT(1) DEFAULT 0,
    rasteplass_tilgjengelig TINYINT(1) DEFAULT 1,
    rasteplass_informasjon TEXT,
    rasteplass_renovasjon VARCHAR(255),
    ip_adresse VARCHAR(45),
    laget DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Vurderinger tabell
CREATE TABLE IF NOT EXISTS vurderinger (
    vurdering_id INT AUTO_INCREMENT PRIMARY KEY,
    rasteplass_id INT NOT NULL,
    bruker_id INT NOT NULL,
    vurdering INT NOT NULL CHECK (vurdering BETWEEN 1 AND 5),
    kommentar TEXT,
    ip_adresse VARCHAR(45),
    laget DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rasteplass_id) REFERENCES rasteplasser(rasteplass_id) ON DELETE CASCADE,
    FOREIGN KEY (bruker_id) REFERENCES brukere(bruker_id) ON DELETE CASCADE
);

-- API Log tabell
CREATE TABLE IF NOT EXISTS api_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    endepunkt VARCHAR(255) NOT NULL,
    metode VARCHAR(10) NOT NULL,
    status_kode INT NOT NULL,
    bruker_id INT,
    request_data TEXT,
    response_data TEXT,
    feilmelding TEXT,
    ip_adresse VARCHAR(45),
    tidspunkt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bruker_id) REFERENCES brukere(bruker_id) ON DELETE SET NULL
);

-- TESTDATA

-- Test Brukere
INSERT INTO brukere (brukernavn, email, passord)
VALUES 
  ('testbruker1', 'test1@example.com', '$2a$11$xChhTszAoKjouvDKJk4hlOp.iaKyszS.ZMWJpszxf7pF55r7ovCB.');
-- Passord for testbruker: passord

-- Test Rasteplasser
INSERT INTO rasteplasser (vegvesen_id, geo_kommune, geo_fylke, rasteplass_navn, rasteplass_type, rasteplass_lat, rasteplass_long, rasteplass_toalett, rasteplass_tilgjengelig, rasteplass_informasjon, rasteplass_renovasjon)
VALUES
  (1001, 'Oslo', 'Oslo', 'Ekeberg Rasteplass', 'Parkering', 59.888888, 10.777777, 1, 1, 'Fin rasteplass med god utsikt.', 'Ja'),
  (1002, 'Bergen', 'Vestland', 'Ulriken Rasteplass', 'Parkering', 60.382222, 5.332222, 1, 1, 'Rasteplass ved fjellet.', 'Ja');

-- Test Forslag
INSERT INTO rasteplasser_forslag (vegvesen_id, geo_kommune, geo_fylke, rasteplass_navn, rasteplass_type, rasteplass_lat, rasteplass_long, rasteplass_toalett, rasteplass_tilgjengelig, rasteplass_informasjon, rasteplass_renovasjon)
VALUES
  (10, 'Drammen', 'Buskerud', 'Drammen Campingplass', 'Camping', 63.430515, 10.395053, 1, 1, 'Ny campingplass forslag.', 'Ja'),
  (101, 'Trondheim', 'Trøndelag', 'Trondheim Campingplass', 'Camping', 63.331368, 10.355440, 1, 1, 'Ny campingplass forslag.', 'Ja');

-- Test Vurderinger
INSERT INTO vurderinger (rasteplass_id, bruker_id, vurdering, kommentar)
VALUES
  (1, 1, 5, 'Fantastisk sted!'),
  (2, 2, 4, 'Veldig fint, men kunne hatt flere søppelkasser.');