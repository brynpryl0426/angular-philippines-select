import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  private fetch(jsonPathName: string) {
    return this.http.get(`assets/address/${jsonPathName}.json`);
  }

  regions() {
    return this.fetch('region').pipe(
      map((data: any) => {
        return data.map((region: any) => {
          return {
            id: region.id,
            psgc_code: region.psgc_code,
            region_name: region.region_name,
            region_code: region.region_code,
          };
        });
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  provinces(code: string) {
    return this.fetch('province').pipe(
      map((data: any) => {
        return data
          .filter((province: any) => {
            return province.region_code === code;
          })
          .map((province: any) => {
            return {
              psgc_code: province.psgc_code,
              province_name: province.province_name,
              province_code: province.province_code,
              region_code: province.region_code,
            };
          });
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  cities(code: string) {
    return this.fetch('city').pipe(
      map((data: any) => {
        return data
          .filter((city: any) => {
            return city.province_code === code;
          })
          .map((city: any) => {
            return {
              city_name: city.city_name,
              city_code: city.city_code,
              province_code: city.province_code,
              region_desc: city.region_desc,
            };
          });
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  barangays(code: string) {
    return this.fetch('barangay').pipe(
      map((data: any) => {
        return data
          .filter((barangay: any) => {
            return barangay.city_code === code;
          })
          .map((barangay: any) => {
            return {
              brgy_name: barangay.brgy_name,
              brgy_code: barangay.brgy_code,
              province_code: barangay.province_code,
              region_code: barangay.region_code,
            };
          });
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }
}
