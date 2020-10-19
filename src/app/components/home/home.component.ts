import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  loading: boolean;

  error: boolean;
  errMessage: string;

  tkn: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
          // this.spotify.getNewReleases()
          //         .then( ( data: any ) => {
          //           this.newReleases = data;
          //           this.loading = false;
          //         }, err => {
          //           this.error = true;
          //           this.loading = false;
          //           this.errMessage = err.error.error.message;
          //         });
          this.spotify.getToken()
            .then( () => {
              this.spotify.getNewReleases()
                .subscribe( (data:any) => {
                  this.newReleases = data;
                  this.loading = false;
                }, err => {
                  this.error = true;
                  this.loading = false;
                  this.errMessage = err.error.error.message;
                })
            });

  }

}
