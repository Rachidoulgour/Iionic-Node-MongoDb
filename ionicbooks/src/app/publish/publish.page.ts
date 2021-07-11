import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from '../interfaces/publication';
import { AuthService } from '../services/auth.service';
import { PublicationService } from '../services/publication.service';
import { TokenService } from '../services/token.service';
import { UploadService } from '../services/upload.service';

import { Storage } from '@ionic/storage';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
   public identity;
  public token;
  public status;
  file: File;
  photoSelected: string | ArrayBuffer;
  public publication: Publication;
  error500;
  private URL = "http://localhost:5050/api";
  pub: any;
  form: FormGroup;
  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private publicationService: PublicationService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage) {
      
     }

  async ngOnInit() {
    this.form = new FormGroup({
      purpose:  new FormControl(null, {
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      author:  new FormControl(null, {
        validators: [Validators.required]
      }),
      text: new FormControl(null, {
        validators: [Validators.required]
      }),
      file:  new FormControl(null),
      
      })

      await this.storage.create();

      this.identity = await this.tokenService.GetUser()
    
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }

  }

  onSubmit() {
    console.log(this.identity)
      if (this.form.status === "VALID"){
        const userId= this.identity._id
    this.publicationService.addPublication(userId, this.form.value).subscribe(
      res => {
        if (this.filesToUpload && this.filesToUpload.length) {
          //subir imagen
          this.uploadService.makeFileRequest(this.URL + '/upload-image-pub/' + res['publication']._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              //this.publication.file = result.image;
              
              this.status = 'success';
              this.router.navigate(['/timeline']);
            });
        } else {
          this.router.navigate(['/timeline']);
          this.status = 'success';
        }

      },
      err => {
        const errorMessage = err;
        console.log(errorMessage);
        if (errorMessage != null) {
          
        
        if (errorMessage.status === 500) {
          this.error500 = errorMessage.status
        } else if (errorMessage.status === 401) {
          //this.authService.logOut();
        }
      }
    })
  }
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
