import React from 'react';
import '@wordpress/format-library';
import { useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { serialize, parse } from '@wordpress/blocks';

import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';

function BlockEditor() {
	const [ blocks, updateBlocks ] = useState( [] );
	const { createInfoNotice } = useDispatch( 'core/notices' );

	useEffect( () => {
		const storedBlocks = window.localStorage.getItem( 'getdavesbeBlocks' );

		if ( storedBlocks && storedBlocks.length ) {
			updateBlocks( () => parse( storedBlocks ) );
			createInfoNotice( 'Blocks loaded', {
				type: 'snackbar',
				isDismissible: true,
			} );
		}
	}, [ createInfoNotice ] );

	function persistBlocks( newBlocks ) {
		updateBlocks( newBlocks );
		window.localStorage.setItem(
			'getdavesbeBlocks',
			serialize( newBlocks )
		);
	}

	return (
		<div className="getdavesbe-block-editor">
			<BlockEditorProvider
				value={ blocks }
				onInput={ updateBlocks }
				onChange={ persistBlocks }
			>
				<div className="editor-styles-wrapper">
					<BlockEditorKeyboardShortcuts />
					<WritingFlow>
						<ObserveTyping>
							<BlockList className="getdavesbe-block-editor__block-list" />
						</ObserveTyping>
					</WritingFlow>
				</div>
			</BlockEditorProvider>
		</div>
	);
}

export default BlockEditor;
