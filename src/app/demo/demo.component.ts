import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: [
    `
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    `
  ],
})
export class DemoComponent implements OnInit {
  regions!: any[];
  provinces!: any[];
  cities!: any[];
  barangays!: any[];

  selectedRegion!: any;
  selectedProvince!: any;
  selectedCity!: any;
  selectedBarangay!: any;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions() {
    this.addressService.regions().subscribe((data) => {
      this.regions = data;
    });
  }

  getProvinces($regionCode: any) {
   this.addressService.getRegionByCode($regionCode.target.value).subscribe((region) => {
      this.selectedRegion = region;
    });
    this.addressService
      .provinces($regionCode.target.value)
      .subscribe((data) => {
        this.provinces = data;
      });
  }

  getCities($provinceCode: any) {
    this.addressService.getProvinceByCode($provinceCode.target.value).subscribe((province) => {
      this.selectedProvince = province;
    });
    this.addressService.cities($provinceCode.target.value).subscribe((data) => {
      this.cities = data;
    });
  }

  getBarangays($cityCode: any) {
    this.addressService.getCityByCode($cityCode.target.value).subscribe((city) => {
      this.selectedCity = city;
    });
    this.addressService.barangays($cityCode.target.value).subscribe((data) => {
      this.barangays = data;
    });
  }

  getBarangay($barangayCode: any) {
    this.addressService.getBarangayByCode($barangayCode.target.value).subscribe((barangay) => {
      this.selectedBarangay = barangay;
    });
  }
}
