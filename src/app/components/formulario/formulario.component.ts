
import { Component, OnInit,EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators,FormControl,FormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
 //error del email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nombre = new FormControl('', [
    Validators.required
  ]);
  apellido = new FormControl('', [
    Validators.required
  ]);
  rut = new FormControl('', [
    Validators.required
  ]);
  direccion = new FormControl('', [
    Validators.required
  ]);
  contrasenia = new FormControl('', [
    Validators.required
  ]);
  contrasenia2 = new FormControl('', [
    Validators.required
  ]);
  /*error del email*/
  region = new FormControl('');
  //ocultar la pass
  hide =true;
  /*ocultar la pass*/
  /*Regiones de chile*/
  regiones = 'Región de Arica y Parinacota.Región de Tarapacá.Región de Antofagasta.Región de Atacama.Región de Coquimbo.Región de Valparaíso.Región Metropolitana de Santiago.Región del Libertador General Bernardo O’Higgins.Región del Maule.Región del Ñuble.Región del Biobío.Región de La Araucanía.Región de Los Ríos.Región de Los Lagos.Región de Aysén del General Carlos Ibáñez del Campo.Región de Magallanes y la Antártica Chilena'.split('.');
  /*******************************/
  /*newValue='';*/
  comunas = ' '.split('.');
  RegistrarForm:FormGroup;

  constructor(public fb: FormBuilder) {

    this.RegistrarForm=this.fb.group({});
  }

  ngOnInit(): void {
  }
   
   
  
  onChange(newValue:String/*event:Event*/) {

    console.log(newValue);
    switch (newValue) {
      case "Región de Arica y Parinacota":
        this.comunas = 'Arica.Camarones.General Lagos.Putre'.split('.');
        break;
      case "Región de Tarapacá":
        this.comunas = 'Alto Hospicio.Camiña.Colchane.Huara.Iquique.Pica.Pozo Almonte'.split('.');
        break;
      case "Región de Antofagasta":
        this.comunas = 'Antofagasta.Calama.María Elena.Mejillones.Ollague.San Pedro de Atacama.Sierra Gorda.Taltal.Tocopilla'.split('.');
        break;
      case "Región de Atacama":
        this.comunas = 'Alto del Carmen.Caldera.Chañaral.Copiapó.Diego de Almagro.Freirina.Huasco.Tierra Amarilla.Vallenar'.split('.');
        break;
      case "Región de Coquimbo":
        this.comunas = 'Andacollo.Canela.Combarbatá.Coquimbo.Illapel.La Higuera.La Serena.Los Vilos.Monte Patria.Ovalle.Paihuano.Punitaqui.Río Hurtado.Salamanca.Vicuña'.split('.');
        break;
      case "Región de Valparaíso":
        this.comunas = 'Algarrobo.Cabildo.Calera.Calle Larga.Cartagena.Casablanca.Catemu.Concón.El Quisco.El Tabo.Hijuelas.Isla de Pascua.Juan Fernández.La Cruz.La Ligua.Limache.Llay-Llay.Los Andes.Nogales.Olmué.Panquehue.Papudo.Petorca.Puchuncaví.Putaendo.Quillota.Quilpué.Quintero.Rinconada.San Antonio.San Esteban.San Felipe.Santa María.Santo Domingo.Valparaíso.Villa Alemana.Viña del Mar.Zapallar'.split('.');
        break;
      case "Región Metropolitana de Santiago":
        this.comunas = 'Alhué.Buin.Calera de Tango.Cerrillos.Cerro Navia.Colina.Conchalí.Curacaví.El Bosque.El Monte.Estación Central.Huechuraba.Independencia.Isla de Maipo.La Cisterna.La Florida.La Granja.Lampa.La Pintana.La Reina.Las Condes.Lo Barnechea.Lo Espejo.Lo Prado.Macul.Maipú.María Pinto.Melipilla.Ñuñoa.Padre Hurtado.Paine.Pedro Aguirre Cerda.Peñaflor.Peñalolén.Pirque.Providencia.Pudahuel.Puente Alto.Quilicura.Quinta Normal.Recoleta.Renca.San Bernardo.San Joaquín.San José de Maipo.San Miguel.San Pedro.San Ramón.Santiago.Talagante.Tiltil.Vitacura'.split('.');
        break;
      case "Región del Libertador General Bernardo O’Higgins":
        this.comunas = 'Chépica.Chimbarongo.Codegua.Coinco.Coltauco.Doñihue.Graneros.La Estrella.Las Cabras.Litueche.Lolol.Machalí.Malloa.Marchihue.Mostazal.Nancagua.Navidad.Olivar.Palmilla.Paredones.Peralillo.Peumo.Pichidegua.Pichilemu.Placilla.Pumanque.Quinta de Tilcoco.Rancagua.Rengo.Requínoa.San Fernando.Santa Cruz.San Vicente de Tagua Tagua'.split('.');
        break;
      case "Región del Maule":
        this.comunas = 'Cauquenes.Chanco.Colbún.Constitución.Curepto.Curicó.Empedrado.Hualañé.Licantén.Linares.Longaví.Maule.Molina.Parral.Pelarco.Pellahue.Pencahue.Rauco.Retiro.Río Claro.Romeral.Sagrada Familia.San Clemente.San Javier.San Rafael.Talca.Teno.Vichuquén.Villa Alegre.Yerbas Buenas'.split('.');
        break;
      case "Región del Ñuble":
        this.comunas = 'Bulnes.Chillán.Chillán Viejo.Cobquecura.Coelemu.Coihueco.El Carmen.Ninhue.Ñiquén.Pemuco.Pinto.Portezuelo.Quíllon.Quirihue.Ránquil.San Carlos.San Fabián.San Ignacio.San Nicolás.Trehuaco.Yungay'.split('.');
        break;
      case "Región del Biobío":
        this.comunas = 'Alto Biobío.Antuco.Arauco.Cabrero.Cañete.Chiguayante.Concepción.Contulmo.Coronel.Curanilahue.Florida.Hualpén.Hualqui.Laja.Lebu.Los Álamos.Los Ángeles.Lota.Mulchén.Nacimiento.Negrete.Penco.Quilaco.Quilleco.San Pedro De La Paz.San Rosendo.Santa Bárbara.Santa Juana.Talcahuano.Tirúa.Tomé.Tucapel.Yumbel'.split('.');
        break;
      case "Región de La Araucanía":
        this.comunas = 'Angol.Carahue.Cholchol.Collipulli.Cunco.Curacautín.Curarrehue.Ercilla.Freire.Galvarino.Gorbea.Lautaro.Loncoche.Lonquimay.Los Sauces.Lumaco.Melipeuco.Nueva Imperial.Padre las Casas.Perquenco.Pitrufquén.Pucón.Purén.Renaico.Saavedra.Temuco.Teodoro Schmidt.Toltén.Traiguén.Victoria.Vilcún.Villarrica'.split('.');
        break;
      case "Región de Los Ríos":
        this.comunas = 'Corral.Futrono.Lago Ranco,Lanco.La Uníon.Los Lagos.Máfil.Mariquina.Paillaco.Panguipulli.Río Bueno.Valdivia'.split('.');
        break;
      case "Región de Los Lagos":
        this.comunas = 'Ancud.Calbuco.Castro.Chaitén.Chonchi.Cochamó.Curaco dde Vélez.Dalcahue.Fresia.Frutillar.Futaleufú.Hualaihué.Llanquihue.Los Muermos.Maullín.Osorno.Palena.Puerto Montt.Puerto Octay.Puerto Varas. Puqueldón.Purranque.Puyahue.Queilén.Quellón.Quemchi.Quinchao.Rio Negro.San Juan de la Costa. San Pablo'.split('.');
        break;
      case "Región de Aysén del General Carlos Ibáñez del Campo":
        this.comunas = 'Aysén.Chile Chico.Cisnes.Cochrane.Coihaique,Guaitecas.Lago Verde.O´higgins.Rio Ibañez.Tortel'.split('.');
        break;
      case "Región de Magallanes y la Antártica Chilena":
        this.comunas = 'Antártica.Cabo de Hornos.Laguna Blanca.Natales.Porvenir.Primavera.Punta Arenas.Río Verde.San Gregorio.Timaukel.Torres del Paine'.split('.');
        break;
      default:
        this.comunas = ''.split('.');
        break;
    }

}
  Registrarse(){
    
    console.log(this.nombre.value+' '+this.apellido.value+' '+this.rut.value+' '+this.direccion.value+' '+this.direccion.value+' '+this.contrasenia.value+' '+this.contrasenia2.value+' '+this.emailFormControl.value);
  }
  
}

