import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, DoCheck,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

import Swal from 'sweetalert2';

import {faAdd, faBlog} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import {User} from "../../model/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../model/post";
import {ExportService} from "../../services/export.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  iconAdd = faAdd;
  iconBlog = faBlog;
  inputSearch: string | undefined;
  postsTemp: Post[] | undefined;
  posts: Post[] | undefined;

  private subscription: Subscription = new Subscription();

  @Input()
  username: string = '';

  @Input()
  loggedIn: boolean = false;

  isAdmin: boolean = false;


  constructor(private authService: AuthService, private userService: UserService, private postService: PostService, private exportService: ExportService, private router: Router) {

  }

  ngOnInit(): void {
    this.postService.getAllPostsWithOutPageSize().subscribe(value => this.posts = value);
    this.posts = this.postsTemp;

    this.userService.isAdmin.subscribe((value) => {
      this.isAdmin = value;
    });

    this.authService.loggedIn.subscribe((value) => {
      this.loggedIn = value;
    });

    this.userService.isLogOut.subscribe(value => {
      this.loggedIn = !value;
    });

    this.postService.fetchInputSearch().subscribe(value => this.inputSearch = value);
    this.postService.fetchAllPost().subscribe(value => this.postsTemp = value);
  }

  onClickNewPost() {
    if (this.isAdmin) {
      this.router.navigate(['/new-post']).then();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'You do not have access',
        icon: 'error',
        confirmButtonText: 'Oke'
      })
    }
  }

  onSearchChange(value: string) {
    if (value === '') {
      this.postService.pushInputSearch('Empty Input Search')
    } else {
      this.postService.pushInputSearch(value);
    }
    if (this.posts) {
      const pushPost = this.posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
      this.postService.pushAllPost(pushPost);
    }
  }

  exportDataToPDF() {
    return this.exportService.getFileReport();
  }
}
