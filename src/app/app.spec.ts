/**
 * Created by Avinash on 2017-03-31.
 */
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {HomePage} from "../pages/home/home";
import {MyApp} from "./app.component";
import {IonicModule, TabButton} from "ionic-angular";
import {TabsPage} from "../pages/tabs/tabs";


let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp],

            providers: [

            ],

            imports: [
                IonicModule.forRoot(MyApp)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {

        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();

    });

    it('initialises with a root page of Tabs page', () => {
        expect(comp['rootPage']).toBe(TabsPage);
    });

});