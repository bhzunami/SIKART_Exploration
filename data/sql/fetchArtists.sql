SET group_concat_max_len = 2048;
SELECT p.Hauptnr, o.Kanton, p.Name, p.Vorname, p.Aktivbeginn, p.Aktivende, p.Lebensdaten, p.Vitazeile, char_length(p.Rating) AS Rating, p.Gattungen, 
GROUP_CONCAT(DISTINCT w.Hauptnr SEPARATOR ', ') AS Werke
FROM ivis_fs16.Person p
INNER JOIN ivis_fs16.Ort o ON p.Buergerort IN(o.Geoname) AND o.Kanton <> '' 
INNER JOIN ivis_fs16.Werk w ON w.Urhauptnr = p.Hauptnr
GROUP BY p.Hauptnr, o.Kanton, p.Name, p.Vorname, p.Aktivbeginn, p.Aktivende, p.Lebensdaten, p.Vitazeile, char_length(p.Rating), p.Gattungen