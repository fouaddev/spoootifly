import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private eleRef: ElementRef) {}

  ngOnInit() {}

  toggleNavbar(): void {
    this.eleRef.nativeElement.querySelector('#navbarDefault').classList.toggle('collapse');
  }

}
