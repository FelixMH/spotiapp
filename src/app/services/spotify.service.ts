import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token:any = this.getToken();

  constructor( private http: HttpClient ) {
    console.log('Servicio de Spotify, Listo!! ');

    this.token = this.getToken()
  }


  async getToken() {

    // const token = await this.getToken();

    const clientId = '2ee78c5fa03c4be9bee818e290da7b57';

    const clientSecret = '9115d663f9264473bf64f3febb11fc9d';

    const body = new HttpParams()
      .append('grant_type', 'client_credentials')
      .append('client_id', clientId)
      .append('client_secret', clientSecret);

    return this.http.post('https://accounts.spotify.com/api/token', body)
            .toPromise()
            .then( (token:any) => {
                this.token = `Bearer ${ token['access_token'] }`;
                // console.log('estoy en el getToken');
                // console.log(this.token);
              }, (err: any) => {
               console.log(err);
              });
  }

  // getToken() {
  //   const url = 'https://accounts.spotify.com/api/token';
  //   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  //   const body = new HttpParams()
  //     .set('grant_type', 'client_credentials')
  //     .set('client_id', '2ee78c5fa03c4be9bee818e290da7b57')
  //     .set('client_secret', '9115d663f9264473bf64f3febb11fc9d');

  //   return this.http.post( url, body, { headers } )
  //             .subscribe( data => {
  //               console.log( 'token: ' + data['access_token'] )
  //               return data['access_token']
  //             })

  // }

  // getQuery( query: string ) {

  //   const url: string = `https://api.spotify.com/v1/${ query } `;

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${ this.tkn }`,
  //   });

  //   console.log( headers )

  //   return this.http.get( url, { headers } );
  // }

  getQuery( query: string ) {

    const url: string = `https://api.spotify.com/v1/${ query } `;

    const headers = new HttpHeaders({
      'Authorization': `${ this.token }`
    });

    console.log( this.token, headers )

    return this.http.get( url, { headers } );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
            .pipe( map( data => data['albums'].items ) );
  }

  getArtists( termino: string ) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map( data => data['artists'].items ) );
  }

  getArtist( id: string ) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks( id: string ) {
    return this.getQuery(`artists/${ id }/top-tracks?market=es`)
          .pipe( map( data => data['tracks'] ) );
  }
}
