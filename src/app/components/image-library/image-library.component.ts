import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {Image} from "../../model/image";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {format, parseISO} from 'date-fns';
import {vi} from 'date-fns/locale';

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrl: './image-library.component.css'
})
export class ImageLibraryComponent implements OnInit, AfterContentChecked {
  on_uploaded!: boolean;
  imageUpload$: Observable<Image[]> | undefined;
  imageList: Image[] = [];
  loading!: boolean;

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.on_uploaded = false;
    this.imageService.getAllImage().subscribe(value => {
      this.imageList = value;
    });
    this.loading = true;
  }

  uploadImage($event: Event) {
    this.on_uploaded = true;
    this.imageUpload$ = this.imageService.uploadImage($event);
    this.imageUpload$.subscribe(value => this.imageList = [...value, ...this.imageList]);
    this.on_uploaded = false;
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

}
