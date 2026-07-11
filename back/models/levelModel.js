export default class Level {

  constructor(
    id,
    numero,
    nombre,
    descripcion,
    xp_reward = 0
  ) {

    this.id = id;
    this.numero = numero;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.xp_reward = xp_reward;

  }

}