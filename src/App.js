import React, { useEffect, useState } from 'react';
import {
	BlockEditorProvider,
	BlockList,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
	BlockSelectionClearer,
	MultiSelectScrollIntoView,
	Typewriter,
	CopyHandler,
} from '@wordpress/block-editor';
import {
	Popover,
	SlotFillProvider,
	DropZoneProvider,
} from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/format-library';
import '@wordpress/notices';
import '@wordpress/data';
import './index.scss';

function App() {
	const [ blocks, updateBlocks ] = useState( [] );

	useEffect( () => {
		registerCoreBlocks();
	}, [] );

	return (
		<div className="playground">
			<SlotFillProvider>
				<DropZoneProvider>
					<BlockEditorProvider
						value={ blocks }
						onInput={ updateBlocks }
						onChange={ updateBlocks }
					>
						<div className="playground__sidebar">
							<BlockInspector />
						</div>
						<BlockSelectionClearer className="edit-post-visual-editor editor-styles-wrapper">
							<MultiSelectScrollIntoView />
							<Popover.Slot name="block-toolbar" />
							<Typewriter>
								<CopyHandler>
									<WritingFlow>
										<ObserveTyping>
											<CopyHandler>
												<BlockList />
											</CopyHandler>
										</ObserveTyping>
									</WritingFlow>
								</CopyHandler>
							</Typewriter>
						</BlockSelectionClearer>
						<Popover.Slot />
					</BlockEditorProvider>
				</DropZoneProvider>
			</SlotFillProvider>
		</div>
	);
}

export default App;
