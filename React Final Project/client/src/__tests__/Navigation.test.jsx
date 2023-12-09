import { expect,it } from "vitest";
import { render, screen } from '@testing-library/react';
import AddChapterPanel from "../admin/addChapter/AddChapterPanel.tsx";
it("renders create chapter panel ",()=>{
        render(<AddChapterPanel />)
        expect(screen.getByText('Create chapter').textContent).toBe('Create chapter');
})

