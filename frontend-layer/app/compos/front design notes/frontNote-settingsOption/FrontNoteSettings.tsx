'use client';

import { ReactElement, useRef } from "react";
import Image from "next/image";
import './frontNoteSettingStyling.css';

// imported icons
import DownloadIcon from '@/public/icons/frontNoteSetting-icons/download-line.svg';
import FolderTransferIcon from '@/public/icons/frontNoteSetting-icons/folder-transfer-line.svg';
import EditNoteIcon from '@/public/icons/frontNoteSetting-icons/pencil-line.svg';
import PinNoteIcon from '@/public/icons/frontNoteSetting-icons/pushpin-2-line.svg';

interface FrontNoteSettingsProps {
    onClose: () => void; // Callback to close settings
}

export default function FrontNoteSettings({ onClose }: FrontNoteSettingsProps): ReactElement {
    const settingsRef = useRef<HTMLDivElement>(null);

    return (
        <div className="frontNoteSettingContainer" ref={settingsRef}>
            <ul>
                <li><Image src={PinNoteIcon} width={20} alt="pinNote" />Pin</li>
                <li><Image src={EditNoteIcon} width={20} alt="editNote" />Edit this Note</li>
                <li><Image src={FolderTransferIcon} width={20} alt="moveNote" />Move to</li>
                <li><Image src={DownloadIcon} width={20} alt="exportNote" />Export</li>
                <hr style={{ margin: '5px 0' }} />
                <li>Delete</li>
            </ul>
        </div>
    );
}
