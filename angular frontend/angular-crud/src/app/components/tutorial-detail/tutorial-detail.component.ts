import { Component, OnInit, Input } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.scss']
})
export class TutorialDetailComponent implements OnInit {
  @Input() viewMode: boolean = false;
  @Input() currentTutorial: Tutorial = {
    title: '', 
    description: '', 
    published: false
  };
  message: string = '';

  constructor(private tutorialService: TutorialService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: Guid): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id!, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTutorial.published = status;
        this.message = res.message ? res.message : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id!, this.currentTutorial).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This tutorial was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id!).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }
}
