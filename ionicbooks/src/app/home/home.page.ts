import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  city: String = '';
  searchQuery: String = '';
  value = '';
  panelOpenState = false;
  url: string;
  status: string;
  page;
  total;
  pages;
  itemsPerPage: any;
  publications: Publication[];
  // sellBooks: Publication[];
  // demandBooks: Publication[];
  // donationBooks: Publication[];
  private URL = "http:localhost:3000/api";
  unreed: number;
  error500;

  constructor(private router: Router,
    private publicationService: PublicationService,) {
      this.page = 1;
    }

    ngOnInit(): void {
      this.getPublications(this.page);
      
    }

  getPublications(page) {

    this.publicationService.getPublications(page).subscribe(
      res => {
        console.log(res)
        this.publications = res['publications'];
        
      },
      err => {
        console.log(err)
      }
    )
  }

  // getHomepageSellBooks() {
  //   this.publicationService.getHomepageSellBooks().subscribe(
  //     res => {
  //       console.log(res)
  //       this.sellBooks = res['publications'];
  //       console.log(this.sellBooks)
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }

  // getHomepageDonationBooks() {
  //   this.publicationService.getHomepageDonationBooks().subscribe(
  //     res => {
  //       console.log(res)
  //       this.donationBooks = res['publications'];
  //       console.log(this.donationBooks)
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }

  // getHomepageDemandBooks() {
  //   this.publicationService.getHomepageDemandBooks().subscribe(
  //     res => {
  //       console.log(res)
  //       this.demandBooks = res['publications'];
  //       console.log(this.demandBooks)
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }

  

}
