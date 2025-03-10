import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective } from "../challenge.service";
import { echo, loadNavData, disengageDockingClamp, engageEngines, plotCourse, disengageEngines, engageTractorBeam, disengageTractorBeam, engageDockingClamp, engageShields, engageLaser, disengageShields } from "./computer.actions";

/**
 * computer service to interface between captain's commands and ngrx store
 * 
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
@Injectable({
    providedIn: 'root'
})
export class ComputerService{
    constructor(private store: Store<AppState>){}

    /**
     * this is called on the captain's very first voice event
     */
    public Initialize(){
        this.store.dispatch(loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]){
        //TODO: decide which actions to dispatch based on the directives passed in!
        directives.forEach(x => {

            this.store.dispatch(
                //TODO: you don't have to echo all the directives, do what you want!
                echo(
                    {
                        message: this.directiveToMessage(x)
                    }
                )
    
                
            );

            if(x.directObject === 'docking clamp'){
                switch(x.verb){
                    case 'disengage': this.store.dispatch(disengageDockingClamp());
                    break;
                    case 'engage' : this.store.dispatch(engageDockingClamp());
                    break;
                } 
            }

            if(x.directObject === 'engines'){
                switch(x.verb){
                    case 'engage': this.store.dispatch(engageEngines({adverb : x.adverb}));
                    break;
                    case 'disengage' : this.store.dispatch(disengageEngines());
                    break;
                }
            }

            if(x.directObject === 'shields'){
                switch(x.verb){
                    case 'engage': this.store.dispatch(engageShields({adverb : x.adverb}));
                    break;
                    case 'disengage' : this.store.dispatch(disengageShields());
                    break;
                }
            }

            if(x.directObject === 'laser'){
                switch(x.verb){
                    case 'engage': this.store.dispatch(engageLaser({adverb : x.adverb}));
                    break;
                }
            }


            if(x.directObject === 'course'){
                switch(x.verb){
                    case 'plot' : this.store.dispatch(plotCourse({adjectivalPhrase: x.adjectivalPhrase}));
                    break;
                }
            }

            if(x.directObject === 'tractorbeam'){
                switch(x.verb){
                    case 'engage' : this.store.dispatch(engageTractorBeam());
                    break;
                    case 'disengage' : this.store.dispatch(disengageTractorBeam());
                    break;
                }
            }

            
        });
    }

    /**
     * this is a helper method to turn a computer directive into a short string
     * 
     * you can change this!
     * @param d 
     * @returns 
     */
    private directiveToMessage(d: IComputerDirective): string{
        let result = "ACK > ";
        if (d.adverb)
            result += d.adverb.toUpperCase() + " ";
        result += d.verb.toUpperCase();
        result += ' THE ';
        result += d.directObject.toUpperCase();
        if (d.adjectivalPhrase)
            result += " " + d.adjectivalPhrase.toUpperCase();
        return result;
    }   
}