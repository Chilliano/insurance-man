import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ProductModel } from 'app/models/product.model';
// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application
const PRODUCT_DATA: ProductModel[] = [
  {
    id: '1',
    name: 'Casa mia!',
    brand: 'Generali',
    'brand-image': 'brand_generali.png',
    kind: 'Hogar',
    'Kind-image': 'kind_home.png',
    price: '300'
  },
  {
    id: '2',
    name: 'No eres imortal',
    brand: 'Mapfre',
    'brand-image': 'brand_mapfre.png',
    kind: 'Vida',
    'Kind-image': 'kind_life.png',
    price: '100'
  },
  {
    id: '3',
    name: 'Panacea',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Viaje',
    'Kind-image': 'kind_travel.png',
    price: '50'
  },
  {
    id: '4',
    name: '<mis_datos>',
    brand: 'AXA',
    'brand-image': 'brand_axa.png',
    kind: 'cybersecurity',
    'Kind-image': 'kind_cibersecurity.png',
    price: '1010'
  },
  {
    id: '5',
    name: 'Cuidado con el peatón',
    brand: 'Liberty',
    'brand-image': 'brand_liberty.png',
    kind: 'Coche',
    'Kind-image': 'kind_car.png',
    price: '120'
  },
  {
    id: '6',
    name: 'Sargento de hierro',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Salud',
    'Kind-image': 'kind_health.png',
    price: '97'
  },
  {
    id: '7',
    name: 'Currante non stop',
    brand: 'Mapfre',
    'brand-image': 'brand_mapfre.png',
    kind: 'Trabajo',
    'Kind-image': 'kind_work.png',
    price: '2001'
  },
  {
    id: '8',
    name: 'Brum! Brum!',
    brand: 'Liberty',
    'brand-image': 'brand_liberty.png',
    kind: 'Coche',
    'Kind-image': 'kind_car.png',
    price: '120'
  },
  {
    id: '9',
    name: 'Gandalf',
    brand: 'generali',
    'brand-image': 'brand_generali.png',
    kind: 'cybersecurity',
    'Kind-image': 'kind_cibersecurity.png',
    price: '2010'
  },
  {
    id: '10',
    name: 'Relajate',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Viaje',
    'Kind-image': 'kind_travel.png',
    price: '55'
  },
  {
    id: '11',
    name: 'Cuidate mucho',
    brand: 'AXA',
    'brand-image': 'brand_axa.png',
    kind: 'Salud',
    'Kind-image': 'kind_health.png',
    price: '256'
  },
  {
    id: '12',
    name: 'Fort Nox',
    brand: 'Liberty',
    'brand-image': 'brand_liberty.png',
    kind: 'Hogar',
    'Kind-image': 'kind_home.png',
    price: '500'
  },
  {
    id: '13',
    name: 'Micheal Knight & KIT',
    brand: 'Generali',
    'brand-image': 'brand_generali.png',
    kind: 'Coche',
    'Kind-image': 'kind_car.png',
    price: '1982'
  },
  {
    id: '14',
    name: 'Como un Golem',
    brand: 'AXA',
    'brand-image': 'brand_axa.png',
    kind: 'Salud',
    'Kind-image': 'kind_health.png',
    price: '123'
  },
  {
    id: '15',
    name: 'Hombre Cafeina',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Trabajo',
    'Kind-image': 'kind_work.png',
    price: '55'
  },
  {
    id: '16',
    name: 'No más lemmings',
    brand: 'Mapfre',
    'brand-image': 'brand_mapfre.png',
    kind: 'Cybersecurity',
    'Kind-image': 'kind_cybersecurity.png',
    price: '500'
  },
  {
    id: '17',
    name: 'Haz el piropuente',
    brand: 'Generali',
    'brand-image': 'brand_generali.png',
    kind: 'Viaje',
    'Kind-image': 'kind_travel.png',
    price: '45'
  },
  {
    id: '18',
    name: 'Para que no te lloren tanto',
    brand: 'Mapfre',
    'brand-image': 'brand_mapfre.png',
    kind: 'Vida',
    'Kind-image': 'kind_life.png',
    price: '81'
  },
  {
    id: '19',
    name: 'Mii miiiii',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Coche',
    'Kind-image': 'kind_car.png',
    price: '35'
  },
  {
    id: '20',
    name: 'Nerver Jubilado',
    brand: 'Liberty',
    'brand-image': 'brand_liberty.png',
    kind: 'Trabajo',
    'Kind-image': 'kind_work.png',
    price: '56'
  },
  {
    id: '21',
    name: 'Foso de cocodrilos',
    brand: 'AXA',
    'brand-image': 'brand_axa.png',
    kind: 'Hogar',
    'Kind-image': 'kind_home.png',
    price: '50000'
  },
  {
    id: '22',
    name: 'Be Barry Allen',
    brand: 'Generali',
    'brand-image': 'brand_generali.png',
    kind: 'Coche',
    'Kind-image': 'kind_car.png',
    price: '444'
  },
  {
    id: '23',
    name: 'Mr.Norton',
    brand: 'Liberty',
    'brand-image': 'brand_liberty.png',
    kind: 'Cybersecurity',
    'Kind-image': 'kind_cybersecurity.png',
    price: '360'
  },
  {
    id: '24',
    name: 'Castaway',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Viaje',
    'Kind-image': 'kind_travel.png',
    price: '9'
  },
  {
    id: '25',
    name: 'Se te ha caído el boli',
    brand: 'Generali',
    'brand-image': 'brand_generali.png',
    kind: 'Trabajo',
    'Kind-image': 'kind_work.png',
    price: '300'
  },
  {
    id: '26',
    name: 'Masajes y relax',
    brand: 'AXA',
    'brand-image': 'brand_axa.png',
    kind: 'Viaje',
    'Kind-image': 'kind_travel.png',
    price: '512'
  },
  {
    id: '27',
    name: 'Cerra la maldita puerta',
    brand: 'Mapfre',
    'brand-image': 'brand_mapfre.png',
    kind: 'Hogar',
    'Kind-image': 'kind_home.png',
    price: '1000'
  },
  {
    id: '28',
    name: 'ESC\\#??$.[SHIFT][RUN][ENTER]8.32!Out of memory',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Cybersecurity',
    'Kind-image': 'kind_cybersecurity.png',
    price: '832'
  },
  {
    id: '29',
    name: 'Luke, yo soy tu padre',
    brand: 'Liberty',
    'brand-image': 'brand_liberty.png',
    kind: 'Vida',
    'Kind-image': 'kind_life.png',
    price: '707'
  },
  {
    id: '30',
    name: 'Feed the troll',
    brand: 'Generali',
    'brand-image': 'brand_generali.png',
    kind: 'Salud',
    'Kind-image': 'kind_health.png',
    price: '333'
  },
  {
    id: '31',
    name: 'Work sweet work',
    brand: 'Zurich',
    'brand-image': 'brand_zurich.png',
    kind: 'Trabajo',
    'Kind-image': 'kind_work.png',
    price: '120'
  },
  {
    id: '32',
    name: 'Safe & Sound',
    brand: 'Mapfre',
    'brand-image': 'brand_mapfre.png',
    kind: 'Coche',
    'Kind-image': 'kind_car.png',
    price: '66'
  },
  {
    id: '33',
    name: 'Por fin se acabo',
    brand: 'AXA',
    'brand-image': 'brand_axa.png',
    kind: 'Vida',
    'Kind-image': 'kind_life.png',
    price: '1234'
  }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<ProductModel> {
  data: ProductModel[] = PRODUCT_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductModel[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductModel[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'kind':
          return compare(a.kind, b.kind, isAsc);
        case 'brand':
          return compare(a.brand, b.brand, isAsc);
        case 'price':
          return compare(+a.price, +b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
