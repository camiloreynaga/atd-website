<?php
// Configuración de versiones de archivos para cache busting
$fileVersions = {
  "css/style.css": "465f9e4f",
  "js/main.js": "a21fad49",
  "js/bootstrap.min.js": "4becdc91",
  "js/jquery.min.js": "4a356126"
};

function getVersionedFile($file) {
    global $fileVersions;
    $version = isset($fileVersions[$file]) ? $fileVersions[$file] : '1';
    return $file . '?v=' . $version;
}
?>