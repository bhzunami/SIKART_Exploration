SET group_concat_max_len = 2048;
SELECT a.Hauptnr, o.Kanton, a.Ausst_Titel AS Titel, a.Ausst_Ort AS Ort, a.Ausst_Institut AS Institut, a.Ausst_Inst_Url AS Url, a.Ausst_Datum AS Datum, a.Jahr AS JahrVon, CAST(a.BisJahr AS UNSIGNED) AS JahrBis, a.KUENSTLER_NAMENSSUCHE AS KuenstlerSuche,
GROUP_CONCAT(DISTINCT w.Hauptnr SEPARATOR ', ') AS Werke
FROM ivis_fs16.Ausstellung a
INNER JOIN ivis_fs16.Ort o ON a.ORTSNR = o.RECNR AND o.Kanton <> '' AND o.Kanton IN ('ZH','BE','LU','UR','SZ','OW','NW','GL','ZG','FR','SO','BS','BL','SH','AR','AI','SG','GR','AG','TG','TI','VD','VS','NE','GE','JU')
INNER JOIN ivis_fs16.Werkverknuepfung v ON a.hauptnr = v.a20_hauptnr
INNER JOIN ivis_fs16.Werk w ON w.hauptnr = v.O20_hauptnr
GROUP BY a.Hauptnr, o.Kanton, a.Ausst_Titel, a.Ausst_Ort, a.Ausst_Institut, a.Ausst_Inst_Url, a.Ausst_Datum, a.Jahr, CAST(a.BisJahr AS UNSIGNED), a.KUENSTLER_NAMENSSUCHE