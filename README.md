# Blockchain-Developer-Test

Este repositorio contiene mi solución al test de desarrollador blockchain basado en un proyecto de e-commerce.

## Descripción

Implementé la conexión con wallet (MetaMask) y la sincronización del estado de la UI con el ciclo de vida de las transacciones.  
El código detecta cambios de red y actualiza la interfaz, muestra mensajes de estado durante la conexión, las transacciones pendientes, confirmaciones y resultados exitosos o fallidos.

## Características

- Conexión y desconexión con MetaMask.
- Detección de cambios en la cuenta y en la red blockchain (Ethereum, Polygon, etc).
- Actualización dinámica del UI con mensajes como:
  - "Connecting..."
  - "Confirm in wallet"
  - "Processing..."
  - "Minted!" o mensajes de error.
- Botones con estilos Bootstrap para interacción amigable.
- Manejo de estados para transacciones pendientes, éxito y error.

## Cómo detectar cambios de red y sincronizar UI

Se usan los eventos de `window.ethereum`:

- `accountsChanged`: Para detectar cuando el usuario cambia o desconecta la cuenta.
- `chainChanged`: Para detectar cuando cambia la red blockchain.

En ambos casos, se re-inicializa la conexión para mantener el estado actualizado en Redux y React.

Las transacciones disparan acciones Redux que actualizan el estado `transaction` con los mensajes correspondientes, que se reflejan en la UI para mostrar spinners, mensajes de confirmación y resultados.

## Instrucciones para clonar y ejecutar

Clonar el repositorio:

```bash
git clone https://github.com/fabirian/Blockchain-Developer-Test.git
```
```bash
cd Blockchain-Developer-Test
```
```bash
npm start
```
```bash
http://localhost:3000


