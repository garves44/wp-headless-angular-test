
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projects = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // need to get the rest API for wordpress still
    this.http.get('http://garvestest.local/wp-json/wp/v2/posts').subscribe(data => {
      // can not itterate over items in object with angular - workaround with projects array
       for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if(data[key].featured_media !== 0) {
             this.http.get(`http://garvestest.local/wp-json/wp/v2/media/${data[key].featured_media}`).subscribe(mediaData => {
              
              if(mediaData){
                data[key].media = mediaData
              } 
            })
            
          }else {
            data[key].media = {source_url:0}
          }
          
          this.projects.push(data[key]);
        }
      }
      console.log(this.projects)
    })
  }


}
