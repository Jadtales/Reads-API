// @ts-ignore
import {getDiskInfo} from "node-disk-info";
import * as path from 'path';
import * as fs from 'node:fs';
import arrangeKindleNotes from "./data-extractor";

// Global variables
let kindleDrivePath = ''; // This will hold the path to the Kindle drive if found
let kindleNotes = ''; // Path to Kindle createnotes if found

// detect all connected drivers
async function detectKindleDrive(): Promise<string | null> {
    try {
        const disks = await getDiskInfo()


        for (const disk of disks) {
            if (disk.filesystem.includes('Removable')) {
                const kindleDirectory = path.join(disk.mounted, 'documents')

                // checking if the documents folder exists
                if (fs.existsSync(kindleDirectory)) {

                    // Now check if 'My Clippings.txt' exists within that directory
                    const clippingsPath = path.join(kindleDirectory, 'My Clippings.txt');
                    if (fs.existsSync(clippingsPath)) {
                        return kindleDirectory;
                    }
                }
            }


        }
    } catch (reason: any) {
        throw new Error(`Undetectable Kindle (no kindle has been detected): ${reason.message}`)
    }

    return null
}


// to find kindle createnotes
async function findKindleNotes(kindleDirectory: string): Promise<string | null> {
    try {
        const filePath = path.join(kindleDirectory, 'My Clippings.txt')

        const data = await fs.promises.readFile(filePath, 'utf8')

        if (data) {
            return data
        }

        return null

    } catch (reason) {
        throw new Error(`Kindle notes is not found: (${reason.message})`)
    }
}


async function main(): Promise<void> {
    const kindleDirectory = await detectKindleDrive();
    if (kindleDirectory) {
        let clippings = await findKindleNotes(kindleDirectory);
        console.log(arrangeKindleNotes(clippings))
    }


}

main();  // Start the process