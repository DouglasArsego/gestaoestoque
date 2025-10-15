import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'filtro',
  standalone: true,
  pure: true
})
export class FiltroPipe implements PipeTransform {
  transform(lista: any[], campo: string): any[] {
    if (!lista || !campo) {
      return lista;
    }

    const termo = campo.toLowerCase();

    return lista.filter(item =>
      item.nome.toLowerCase().includes(termo)
    );
  }
}