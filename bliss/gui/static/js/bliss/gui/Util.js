/*
 * Advanced Multi-Mission Operations System (AMMOS) Instrument Toolkit (AIT)
 * Bespoke Link to Instruments and Small Satellites (BLISS)
 *
 * Copyright 2017, by the California Institute of Technology. ALL RIGHTS
 * RESERVED. United States Government Sponsorship acknowledged. Any
 * commercial use must be negotiated with the Office of Technology Transfer
 * at the California Institute of Technology.
 *
 * This software may be subject to U.S. export control laws. By accepting
 * this software, the user agrees to comply with all applicable U.S. export
 * laws and regulations. User has the responsibility to obtain export licenses,
 * or other export authority as may be required before exporting such
 * information to foreign countries or providing access to foreign persons.
 */

const Modal = {
    _display_modal: false,
    _data: null,

    _reset_modal() {
        this._display_modal = false
        this._data = null
    },

    oncreate(vnode) {
        bliss.events.on('modal:show', (data) => {
            this._display_modal = true
            this._data = data
            console.log(this._data)
            m.redraw()
        })

        bliss.events.on('modal:close', () => {
            this._reset_modal()
            m.redraw()
        })
    },

    view(vnode) {
        console.log('rendering modal')
        let header = ''
        let body = ''
        let footer = ''

        if (this._data !== null) {
            if ('header' in this._data) {
                header = this._data.header
            } else {
                header = m('button', {
                    type: 'button',
                    class: 'close',
                    'data-dimiss': modal,
                    onclick: () => {
                        this._reset_modal()
                    }
                }, m('span', "\u00D7"))
            }

            if ('body' in this._data) {
                body = this._data.body
            } else {
                body = ''
            }

            if ('footer' in this._data){
                footer = this._data.footer
            } else {
                footer = m('div', {
                    type: 'button',
                    class: 'btn btn-default',
                    'data-dismiss': 'modal',
                    onclick: () => {
                        this._reset_modal()
                    }
                }, 'Close')
            }
        }

        let modal = m('div', {class: 'modal show', tabindex: '-1', role: 'dialog'},
            m('div', {class: 'modal-dialog', 'role': 'document'},
                m('div', {class: 'modal-content'}, [
                    m('div', {class: 'modal-header'}, header),
                    m('div', {class: 'modal-body'}, body),
                    m('div', {class: 'modal-footer'}, footer)
                ])
            )
        )

        if (this._display_modal) {
            return m('bliss-modal', modal)
        } else {
            return m('bliss-modal')
        }
    }
}

export default {Modal}
export {Modal}
