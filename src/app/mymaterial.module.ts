import { NgModule } from '@angular/core';

import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
    exports: [MatButtonModule, MatCardModule, MatIconModule],
    imports: [MatButtonModule, MatCardModule, MatIconModule],
})
export class MyMaterialsModule {

}
