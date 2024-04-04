import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {PostService} from "../../services/post.service";
import {Post} from "../../model/post";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  iconAdd = faAdd;
  user$: Observable<User> | undefined;
  inputSearch: string | undefined;
  postsTemp: Post[] | undefined;
  posts: Post[] | undefined;

  @Input()
  username: string = '';

  @Input()
  loggedIn: boolean = false;

  isAdmin: boolean = false;


  constructor(private authService: AuthService, private router: Router, private userService: UserService, private postService: PostService) {

  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserDetail(this.username);
    this.postService.getAllPostsWithOutPageSize().subscribe(value => this.postsTemp = value);
    this.posts = this.postsTemp;

    this.userService.isAdmin.subscribe((value) => {
      this.isAdmin = value;
    })

    this.authService.loggedIn.subscribe((value) => {
      this.loggedIn = value;
    });

    this.userService.isLogOut.subscribe(value => {
      this.loggedIn = !value;
    })

    this.postService.fetchInputSearch().subscribe(value => this.inputSearch = value);
    this.postService.fetchAllPost().subscribe(value => this.postsTemp = value);
  }

  onClickNewPost() {
    if (this.isAdmin) {
      this.router.navigate(['/new-post']).then(value => console.log(value));
    } else {
      alert('Need permit ADMIN');
    }
  }

  onSearchChange(value: string) {
    if(value === '') {
      this.postService.pushInputSearch('Empty Input Search')
    } else {
      this.postService.pushInputSearch(value);
    }
    if (this.posts) {
      const pushPost = this.posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
      this.postService.pushAllPost(pushPost);
    }
  }
}
