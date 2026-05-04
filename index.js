```javascript
// Generador de números primos hasta N
// Ejecutable con: node index.js

const readline = require('readline');

// Función para generar números primos usando el Criba de Eratóstenes
function generarPrimos(n) {
  if (n < 2) return [];
  
  // Crear un array booleano "primo[0..n]" e inicializar todos como verdaderos
  const primo = new Array(n + 1).fill(true);
  primo[0] = primo[1] = false;
  
  // Aplicar la Criba de Eratóstenes
  for (let p = 2; p * p <= n; p++) {
    if (primo[p]) {
      // Marcar todos los múltiplos de p como no primos
      for (let i = p * p; i <= n; i += p) {
        primo[i] = false;
      }
    }
  }
  
  // Recolectar todos los números que siguen siendo marcados como primos
  const primos = [];
  for (let i = 2; i <= n; i++) {
    if (primo[i]) {
      primos.push(i);
    }
  }
  
  return primos;
}

// Función para verificar si un número es primo
function esPrimo(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Función para mostrar estadísticas
function mostrarEstadisticas(primos, n) {
  console.log('\n╔════════════════════════════════════╗');
  console.log('║      ESTADÍSTICAS DE PRIMOS        ║');
  console.log('╚════════════════════════════════════╝');
  console.log(`Total de primos hasta ${n}: ${primos.length}`);
  console.log(`Porcentaje de primos: ${((primos.length / n) * 100).toFixed(2)}%`);
  
  if (primos.length > 0) {
    console.log(`Primer primo: ${primos[0]}`);
    console.log(`Último primo: ${primos[primos.length - 1]}`);
    
    // Calcular promedio de diferencias entre primos consecutivos
    let sumaDiferencias = 0;
    for (let i = 1; i < primos.length; i++) {
      sumaDiferencias += primos[i] - primos[i - 1];
    }
    const promedioDiferencia = (sumaDiferencias / (primos.length - 1)).toFixed(2);
    console.log(`Diferencia promedio entre primos consecutivos: ${promedioDiferencia}`);
  }
}

// Función para mostrar los primos de manera formateada
function mostrarPrimos(primos) {
  console.log('\n╔════════════════════════════════════╗');
  console.log('║        NÚMEROS PRIMOS GENERADOS    ║');
  console.log('╚════════════════════════════════════╝');
  
  if (primos.length === 0) {
    console.log('No hay números primos en el rango especificado.');
    return;
  }
  
  // Mostrar los primos en filas de 10
  const columnasPosFila = 10;
  for (let i = 0; i < primos.length; i += columnasPosFila) {
    const fila = primos.slice(i, i + columnasPosFila).join(', ');
    console.log(fila);
  }
}

// Función principal interactiva
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\n╔════════════════════════════════════╗');
  console.log('║   GENERADOR DE NÚMEROS PRIMOS      ║');
  console.log('╚════════════════════════════════════╝\n');
  
  rl.question('Ingresa el número máximo (N): ', (respuesta) => {
    const n = parseInt(respuesta);
    
    if (isNaN(n) || n < 2) {
      console.log('\n❌ Error: Debes ingresar un número mayor o igual a 2');
      rl.close();
      return;
    }
    
    console.log(`\n⏳ Generando números primos hasta ${n}...`);
    
    const inicio = Date.now();
    const primos = generarPrimos(n);
    const duracion = Date.now() - inicio;
    
    mostrarPrimos(primos);
    mostrarEstadisticas(primos, n);
    
    console.log(`\n⏱️  Tiempo de ejecución: ${duracion}ms`);
    
    // Preguntar si desea verificar un número específico
    rl.question('\n¿Deseas verificar si un número es primo? (s/n): ', (respuesta) => {
      if (respuesta.toLowerCase() === 's') {
        rl.question('Ingresa el número a verificar: ', (numStr) => {
          const num = parseInt(numStr);
          
          if (isNaN(num)) {
            console.log('❌ Número inválido');
          } else {
            const resultado = esPrimo(num);
            const mensaje = resultado ? '✅ SÍ es primo' : '❌ NO es primo';
            console.log(`\nEl número ${num} ${mensaje}`