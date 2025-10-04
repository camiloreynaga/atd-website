<?php
/**
 * ATD PERU - Configuración del sitio
 * Archivo de configuración para emails y configuraciones generales
 */

// Configuración de emails
define('CONTACT_EMAIL', 'proyectos@atdperu.pe');
define('FROM_EMAIL', 'noreply@atdperu.pe');
define('ADMIN_EMAIL', 'admin@atdperu.pe'); // Email alternativo para administración

// Configuración del sitio
define('SITE_NAME', 'ATD PERU');
define('SITE_URL', 'https://atdperu.pe');

// Configuración de emails
$email_config = [
    'contact' => CONTACT_EMAIL,
    'from' => FROM_EMAIL,
    'admin' => ADMIN_EMAIL,
    'subject_prefix' => '[ATD PERU]',
    'reply_to' => FROM_EMAIL
];

// Configuración de la empresa
$company_info = [
    'name' => 'ATD PERU',
    'full_name' => 'ATD PERU SERVICIOS S.A.C.',
    'address' => 'Av. Huayruropata 1953, Residencial Santa Lucia - Dpto 703, Cusco, Perú',
    'phones' => [
        '+51 084 205 390',
        '+51 984 646 690'
    ],
    'email' => CONTACT_EMAIL,
    'website' => SITE_URL,
    'business_hours' => [
        'weekdays' => 'Lunes - Viernes: 8:00 AM - 6:00 PM',
        'saturday' => 'Sábados: 9:00 AM - 1:00 PM'
    ]
];

// Configuración de servicios
$services = [
    'obras-civiles' => 'Obras Civiles',
    'mantenimiento' => 'Mantenimiento',
    'consultoria' => 'Consultoría',
    'energia' => 'Energía',
    'data-center' => 'Data Center',
    'climatizacion' => 'Climatización',
    'otro' => 'Otro'
];

// Configuración de seguridad
$security_config = [
    'max_message_length' => 2000,
    'rate_limit' => 5, // Máximo 5 mensajes por IP por hora
    'allowed_file_types' => ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    'max_file_size' => 5 * 1024 * 1024, // 5MB
    'honeypot_field' => 'website' // Campo honeypot para spam
];

// Función para obtener configuración
function get_config($key = null) {
    global $email_config, $company_info, $services, $security_config;
    
    $config = [
        'email' => $email_config,
        'company' => $company_info,
        'services' => $services,
        'security' => $security_config
    ];
    
    if ($key === null) {
        return $config;
    }
    
    return isset($config[$key]) ? $config[$key] : null;
}

// Función para validar rate limiting
function check_rate_limit($ip) {
    $rate_limit_file = 'rate_limit.json';
    $current_time = time();
    $rate_limit = get_config('security')['rate_limit'] * 3600; // Convertir a segundos
    
    if (file_exists($rate_limit_file)) {
        $data = json_decode(file_get_contents($rate_limit_file), true);
        
        // Limpiar entradas antiguas
        $data = array_filter($data, function($timestamp) use ($current_time, $rate_limit) {
            return ($current_time - $timestamp) < $rate_limit;
        });
        
        // Verificar si la IP ha excedido el límite
        $ip_attempts = array_filter($data, function($timestamp, $ip_key) use ($ip) {
            return $ip_key === $ip;
        }, ARRAY_FILTER_USE_BOTH);
        
        if (count($ip_attempts) >= get_config('security')['rate_limit']) {
            return false;
        }
        
        // Agregar nueva entrada
        $data[$ip] = $current_time;
    } else {
        $data = [$ip => $current_time];
    }
    
    // Guardar datos actualizados
    file_put_contents($rate_limit_file, json_encode($data));
    return true;
}

// Función para limpiar rate limiting (ejecutar diariamente)
function clean_rate_limit() {
    $rate_limit_file = 'rate_limit.json';
    if (file_exists($rate_limit_file)) {
        $data = json_decode(file_get_contents($rate_limit_file), true);
        $current_time = time();
        $rate_limit = get_config('security')['rate_limit'] * 3600;
        
        $data = array_filter($data, function($timestamp) use ($current_time, $rate_limit) {
            return ($current_time - $timestamp) < $rate_limit;
        });
        
        file_put_contents($rate_limit_file, json_encode($data));
    }
}

// Función para obtener headers de email
function get_email_headers($reply_to = null) {
    $config = get_config('email');
    $reply_to = $reply_to ?: $config['reply_to'];
    
    return [
        'From' => $config['from'],
        'Reply-To' => $reply_to,
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/html; charset=UTF-8',
        'X-Priority' => '3'
    ];
}

// Función para log de errores
function log_error($message, $context = []) {
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'message' => $message,
        'context' => $context,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    $log_file = 'error_log.json';
    $logs = [];
    
    if (file_exists($log_file)) {
        $logs = json_decode(file_get_contents($log_file), true) ?: [];
    }
    
    $logs[] = $log_entry;
    
    // Mantener solo los últimos 1000 logs
    if (count($logs) > 1000) {
        $logs = array_slice($logs, -1000);
    }
    
    file_put_contents($log_file, json_encode($logs, JSON_PRETTY_PRINT));
}

// Auto-limpieza de rate limiting (ejecutar una vez al día)
if (rand(1, 100) === 1) { // 1% de probabilidad en cada carga
    clean_rate_limit();
}
?>

