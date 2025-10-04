<?php
/**
 * ATD PERU - Contact Form Handler
 * Procesa el formulario de contacto y envía emails
 * Compatible con hosting compartido WebHostingWorld
 */

// Incluir configuración
require_once 'config.php';

// Obtener configuración
$email_config = get_config('email');
$company_info = get_config('company');
$services = get_config('services');
$security_config = get_config('security');

// Configuración de emails
$to_email = $email_config['contact'];
$from_email = $email_config['from'];
$subject_prefix = $email_config['subject_prefix'] . " Nuevo mensaje de contacto";

// Función para limpiar datos de entrada
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Función para validar email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Función para enviar email
function send_contact_email($data, $to, $headers) {
    global $subject_prefix;
    $subject = $subject_prefix . " - " . $data['subject_text'];
    
    // Crear el contenido del email en HTML
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #007bff; }
            .value { margin-top: 5px; }
            .footer { background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nuevo Mensaje de Contacto - ATD PERU</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nombre Completo:</div>
                    <div class='value'>" . htmlspecialchars($data['name']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($data['email']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Teléfono:</div>
                    <div class='value'>" . htmlspecialchars($data['phone']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Asunto:</div>
                    <div class='value'>" . htmlspecialchars($data['subject_text']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Mensaje:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Fecha y Hora:</div>
                    <div class='value'>" . date('d/m/Y H:i:s') . "</div>
                </div>
                <div class='field'>
                    <div class='label'>IP del Cliente:</div>
                    <div class='value'>" . $_SERVER['REMOTE_ADDR'] . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Este mensaje fue enviado desde el formulario de contacto de atdperu.pe</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Enviar email
    return mail($to, $subject, $message, $headers);
}

// Función para enviar email de confirmación al cliente
function send_confirmation_email($data, $headers) {
    $subject = "Confirmación de mensaje recibido - ATD PERU";
    
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 20px; }
            .footer { background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>¡Mensaje Recibido!</h2>
            </div>
            <div class='content'>
                <p>Estimado/a <strong>" . htmlspecialchars($data['name']) . "</strong>,</p>
                <p>Hemos recibido su mensaje y nos pondremos en contacto con usted lo antes posible.</p>
                <p><strong>Resumen de su consulta:</strong></p>
                <ul>
                    <li><strong>Asunto:</strong> " . htmlspecialchars($data['subject_text']) . "</li>
                    <li><strong>Fecha:</strong> " . date('d/m/Y H:i:s') . "</li>
                </ul>
                <p>Nuestro equipo revisará su solicitud y le responderá en un plazo máximo de 24 horas.</p>
                <p>Si tiene alguna pregunta urgente, puede contactarnos directamente:</p>
                <ul>
                    <li>Teléfono: +51 084 205 390 / +51 984 646 690</li>
                    <li>Email: proyectos@atdperu.pe</li>
                </ul>
                <p>Gracias por confiar en ATD PERU.</p>
            </div>
            <div class='footer'>
                <p>ATD PERU - Servicios de Construcción y Consultoría</p>
                <p>Av. Huayruropata 1953, Residencial Santa Lucia - Dpto 703, Cusco, Perú</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    return mail($data['email'], $subject, $message, $headers);
}

// Configurar respuesta JSON
header('Content-Type: application/json; charset=utf-8');

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
    exit;
}

// Verificar que se hayan enviado los datos necesarios
$required_fields = ['name', 'email', 'phone', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    echo json_encode([
        'success' => false,
        'message' => 'Por favor, complete todos los campos obligatorios.',
        'missing_fields' => $missing_fields
    ]);
    exit;
}

// Limpiar y validar datos
$form_data = [
    'name' => clean_input($_POST['name']),
    'email' => clean_input($_POST['email']),
    'phone' => clean_input($_POST['phone']),
    'subject' => isset($_POST['subject']) ? clean_input($_POST['subject']) : '',
    'message' => clean_input($_POST['message']),
    'privacy' => isset($_POST['privacy']) ? true : false
];

// Validar email
if (!validate_email($form_data['email'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Por favor, ingrese un email válido.'
    ]);
    exit;
}

// Verificar aceptación de política de privacidad
if (!$form_data['privacy']) {
    echo json_encode([
        'success' => false,
        'message' => 'Debe aceptar la política de privacidad para continuar.'
    ]);
    exit;
}

// Mapear asuntos usando configuración
$form_data['subject_text'] = isset($services[$form_data['subject']]) 
    ? $services[$form_data['subject']] 
    : 'Consulta General';

// Verificar rate limiting
if (!check_rate_limit($_SERVER['REMOTE_ADDR'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Demasiados intentos. Por favor, espere antes de enviar otro mensaje.'
    ]);
    exit;
}

// Verificar longitud del mensaje
if (strlen($form_data['message']) > $security_config['max_message_length']) {
    echo json_encode([
        'success' => false,
        'message' => 'El mensaje es demasiado largo. Máximo ' . $security_config['max_message_length'] . ' caracteres.'
    ]);
    exit;
}

// Obtener headers de email
$headers = get_email_headers();

// Intentar enviar emails
try {
    // Enviar email a la empresa
    $email_sent = send_contact_email($form_data, $to_email, $headers);
    
    // Enviar email de confirmación al cliente
    $confirmation_sent = send_confirmation_email($form_data, $headers);
    
    if ($email_sent) {
        // Log del envío (opcional)
        $log_entry = date('Y-m-d H:i:s') . " - Mensaje de: " . $form_data['name'] . " (" . $form_data['email'] . ")\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true,
            'message' => 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
            'confirmation_sent' => $confirmation_sent
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al enviar el mensaje. Por favor, intente nuevamente o contacte directamente por teléfono.'
        ]);
    }
    
} catch (Exception $e) {
    // Log del error
    log_error("Error en formulario de contacto: " . $e->getMessage(), [
        'form_data' => $form_data,
        'ip' => $_SERVER['REMOTE_ADDR']
    ]);
    
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor. Por favor, intente nuevamente más tarde.'
    ]);
}
?>
