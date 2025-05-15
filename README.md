# scraper-nodejs

Scraper para Licitaciones de Estacionamientos en Mercado Público
Este proyecto es un scraper de NodeJS diseñado para obtener información sobre licitaciones relacionadas con estacionamientos y parquímetros desde la API de Mercado Público de Chile.

## Descripción

El scraper consulta la API de Mercado Público para un rango específico de días, filtra las licitaciones relacionadas con estacionamientos o parquímetros, y almacena la información relevante en archivos JSON y Excel para su posterior análisis.

## Características

- Consulta licitaciones con estados "publicada" y "adjudicada"
- Filtra automáticamente por palabras clave como "estacionamiento", "parquímetro"
- Almacena resultados en formato JSON y Excel
- Previene duplicados al actualizar el archivo Excel
- Proporciona una API REST simple para acceder a los datos
- Limita las solicitudes con pausas para respetar las restricciones de la API

## Requisitos previos

- Node.js (v18 o superior)
- Acceso a la API de Mercado Público (ticket de API)

## Instalación

1. Clonar el repositorio:

```
git clone https://github.com/MatiasColil/scraper-nodejs.git
cd scraper-nodejs
```

2. Instalar dependencias:

```
npm install
```

3. Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

```
TICKET=ticket_api_mercado_publico
```

Para pedir un ticket ir a: [Ticket API Mercado Público](https://api.mercadopublico.cl/modules/Participa.aspx)

## Uso

Ejecutar servidor API
Esto iniciará un servidor Express en el puerto 3000. Para obtener las licitaciones, realiza una petición GET a:

```
http://localhost:3000/licitaciones?dias=7
```

Donde el parámetro dias especifica la cantidad de días hacia atrás a consultar.

## Datos obtenidos

Para cada licitación relevante, el scraper obtiene la siguiente información:

- nombre: Nombre de la licitación
- estado: Estado actual (publicada o adjudicada)
- codigo: Código externo único de la licitación
- entidadLicitante: Organismo que realiza la licitación
- fechaCierre: Fecha de cierre de la licitación
- link: URL pública para acceder a los detalles en Mercado Público
- duracionContrato: Duración del contrato
- plazas: Número de plazas (no disponible directamente en la API)
- montoMinimo: Monto mínimo de la licitación en UTM

## Almacenamiento de datos

Los resultados se almacenan en dos formatos:

1. **dataLicitaciones.json** - Contiene todas las licitaciones encontradas en la última ejecución
2. **dataLicitaciones.xlsx** - Archivo Excel que mantiene un histórico de todas las licitaciones encontradas

El sistema está diseñado para evitar duplicados en el archivo Excel. Cuando se realizan nuevas consultas, el programa:

- Verifica si el archivo Excel ya existe
- Si existe, lee las licitaciones actuales y obtiene sus códigos únicos
- Compara las nuevas licitaciones con las existentes usando el campo 'codigo' como identificador único
- Solo añade al Excel las licitaciones que no estaban previamente registradas
- Preserva todo el historial de licitaciones encontradas anteriormente

De esta manera, el archivo Excel actúa como una base de datos histórica que crece con cada ejecución sin duplicar información.

## Limitaciones

- La API no proporciona directamente el número de plazas de estacionamiento, esta información debe extraerse manualmente de los documentos adjuntos de cada licitación.
- Se implementa un tiempo de espera entre solicitudes para respetar las restricciones de la API.
