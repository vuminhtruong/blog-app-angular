import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  Inject, OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Post} from "../../model/post";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Image} from "../../model/image";
import {ImageService} from "../../services/image.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrl: './add-image-dialog.component.css'
})
export class AddImageDialogComponent implements OnInit, AfterContentChecked, OnDestroy {
  postId: string = '';
  imageList: Image[] = [];
  image: Image | undefined;
  loading!: boolean;
  imageId: number | undefined;

  private subscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    postId: string
  }, private imageService: ImageService, private router: Router) {

  }

  ngOnInit() {
    this.postId += this.data.postId;
    this.subscription.add(this.imageService.getAllImage().subscribe(value => this.imageList = value));
    this.loading = true;
  }

  ngAfterContentChecked() {
    if (this.imageList.length > 0) {
      this.loading = false;
    }
  }

  onSelectImage(id: number) {
    this.imageId = id;
    this.image = this.imageList.find(image => image.id === this.imageId);
  }

  onSubmitImage() {
    this.image = this.imageList.find(image => image.id === this.imageId);
    if (this.image) {
      this.imageService.addImageForPost(this.postId, this.image).subscribe({
        next: () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Upload Successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/']).then();
        },
        error: err => {
          Swal.fire({
            title: 'Error!',
            text: 'You do not have access!',
            icon: 'error',
            confirmButtonText: 'Oke'
          })
        }
      });
    } else {
      alert('Image not found!')
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
