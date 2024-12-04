import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromHome from './store';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/effects/home.effects';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home.component';
import { PostDisplayCardComponent } from '../shared/components/post-display-card/post-display-card.component';
import { MiniPostCardComponent } from '../shared/components/mini-post-card/mini-post-card.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducers, {
      metaReducers: fromHome.metaReducers,
    }),
    EffectsModule.forFeature([HomeEffects]),
    PostDisplayCardComponent,
    MiniPostCardComponent,
  ],
})
export class HomeModule {}
