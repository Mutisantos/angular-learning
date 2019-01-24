import {Pipe, PipeTransform} from '@angular/core';

// Create a pipe named 'Search'
@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    // Recieved value for formatting - Args used in the Pipe
    public transform(value, args: string) {
        if (!value) {
            return;
        }
        // With no queryString defined, it would show all of the friends in list
        if (!args) {
            return value;
        }
        args = args.toLowerCase();
        return value.filter((item) => {
            // Using an anonymous function, it will filter the array with the fields that include the received args
            const params = item['nick'] + item['email'];
            return params.toLowerCase().includes(args);
        });
    }
}

