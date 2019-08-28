import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  loadedRecipe: Recipe;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesSvc: RecipesService,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap =>{
        if(!paramMap.has('recipeId')) {return; }
        this.loadedRecipe = this.recipesSvc.getRecipe(paramMap.get('recipeId'));
      });
  }

  async deleteRecipe() {
    const alert = await this.alertController.create({
      header: 'Delete Recipe',
      message: 'Message Are you sure you want to delete this recipe?',
      buttons: [
        {
          text: 'YES',
          handler: (blah) => {
            console.log('Confirm YES');
            // Hapus
            this.recipesSvc.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
            // Tampilkan Toast
            this.tampilkanToastHapus();
          }
        }, {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
            this.tampilkanToastBatal();
          }
        }
      ]
    });

    await alert.present();
  }

  async tampilkanToastHapus() {
    const toast = await this.toastController.create({
      message: 'Recipe has been deleted.',
      duration: 2000
    });
    toast.present();
  }

  async tampilkanToastBatal() {
    const toast = await this.toastController.create({
      message: 'Deletion has been canceled.',
      duration: 2000
    });
    toast.present();
  }

}
