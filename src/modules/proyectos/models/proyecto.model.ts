import { Archivo } from './archivo.model';

export interface Proyecto {
    _id: string;
    nombre: string;
    preview: string;
    nombreDis: string;
    packaging: string;
    material: string;
    impresor: string;
    tipoArchivo: string;
    fecha: string;
    cliente: string;
    clienteNombre: string;
    artwork: string;
    informe: string;
    contacto: string;
    estado: string;
    archivos: Array<Archivo>;
}
