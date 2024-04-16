import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {Image} from "../../model/image";
import {Subscription} from "rxjs";
import {format, parseISO} from 'date-fns';
import {vi} from 'date-fns/locale';
import Swal from "sweetalert2";

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrl: './image-library.component.css'
})
export class ImageLibraryComponent implements OnInit, AfterContentChecked, OnDestroy {
  on_uploaded!: boolean;
  imageList: Image[] = [];
  loading!: boolean;
  fetched: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.on_uploaded = false;
    this.subscriptions.add(this.imageService.getAllImage().subscribe(value => {
      this.imageList = value;
    }));
    this.loading = true;
  }

  uploadImage($event: Event) {
    this.on_uploaded = true;
    this.imageService.uploadImage($event).subscribe(value => {
        this.imageList = value.concat(this.imageList);
        this.fetched = true;
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'You do not have access',
          icon: 'error',
          confirmButtonText: 'Oke'
        })
        this.on_uploaded = false;
        this.fetched = false;
      }
    );
  }

  parseDate(date: Date): string {
    const parsedDate = parseISO(date.toString());
    return format(parsedDate, "EEEE HH:mm dd-MM-yyyy", {locale: vi});
  }

  ngAfterContentChecked(): void {
    if (this.imageList.length != 0) {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
