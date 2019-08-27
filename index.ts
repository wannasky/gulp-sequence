import {series, parallel} from 'gulp';

const task = (seqTasks: any[], init = false): any => {
    const tasks: any[] = [];
    let hasAsync = false;
    seqTasks.forEach((item: string | string[]) => {
        if (Array.isArray(item)) {
            hasAsync = true;
            tasks.push(parallel(...task(item)));
        } else {
            tasks.push(item);
        }
    });
    return (hasAsync && !init) ? [series(...tasks)] : tasks;
};

export function sequence(...args: any[]) {
    return (done: any) => {
        series(...task(args, true))(done);
    };
}
