import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { MateriasComponent } from './components/materias/materias.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { CambioInfoService } from './services/cambio-info.service';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { NgxPrintElementModule } from 'ngx-print-element';
import { ProfesoresJefeComponent } from './components/profesores-jefe/profesores-jefe.component';
import { ArticulosDirectorComponent } from './components/articulos-director/articulos-director.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { EventosViceComponent } from './components/eventos-vice/eventos-vice.component';
import { ActividadesViceComponent } from './components/actividades-vice/actividades-vice.component';
import { ActividadesDirectorComponent } from './components/actividades-director/actividades-director.component';
import { EventosDirectorComponent } from './components/eventos-director/eventos-director.component';
import { ImprimirArticulosComponent } from './components/imprimir-articulos/imprimir-articulos.component';
import { ImprimirActividadesComponent } from './components/imprimir-actividades/imprimir-actividades.component';

import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ImprimirEventosComponent } from './components/imprimir-eventos/imprimir-eventos.component';
export function HttpLoaderFactory(http: HttpClient) { return new TranslateHttpLoader(http, "./assets/i18n/", ".json"); }


@NgModule({ /* para hacer la relacion entre formulario con el modelo */
    declarations: [
        AppComponent,
        LoginComponent,
        ProfesorComponent,
        NavigationComponent,
        GeneralesComponent,
        HomeComponent,
        ArticulosComponent,
        ArticulosViceComponent,
        RecuperarComponent,
        MateriasComponent,
        FooterComponent,
        ProfesoresViceComponent,
        InstitutosViceComponent,
        CarrerasViceComponent,
        ProfesoresJefeComponent,
        ArticulosDirectorComponent,
        EventosComponent,
        ActividadesComponent,
        EventosViceComponent,
        ActividadesViceComponent,
        ActividadesDirectorComponent,
        EventosDirectorComponent,
        ImprimirArticulosComponent,
        ImprimirActividadesComponent,
        ImprimirEventosComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgxPaginationModule,
        NgxPrintModule,
        NgxPrintElementModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),

    ],
    providers: [CambioInfoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
