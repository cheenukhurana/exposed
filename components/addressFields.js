import { useState } from "react"


const AddressFields = () => {

    const [numberOfAddresses, setNumberOfAddresses] = useState(2)
    const [addresses, setAddresses] = useState([null, null])
    const [indexArray, setIndexArray] = useState([1, 2])

    const handleAddAddress = () => {
        setNumberOfAddresses(numberOfAddresses + 1)
        let arr = []
        for (let i = 1; i <= numberOfAddresses; i++) {
            arr[i - 1] = i
        }
        setIndexArray(arr)
    }

    const modifyAddress = (address, index) => {
        let newArray = addresses
        newArray[index] = address
        setAddresses(newArray)
    }

    return (
        <div>

            <div>
                {
                    indexArray.map(index => (
                        <>
                            <input className="mt-2 w-[22rem] px-4 py-1.5 text-sm rounded-md" type="text" name={`Address${index}`} placeholder={`Address ${index}`} value={addresses[index-1]} onChange={e => modifyAddress(e.target.value, index - 1)} />
                            <br />
                        </>
                    ))
                }

            </div>

            <div className="mt-4">
                <button className="bg-[#ea088c] px-4 py-1.5 text-white rounded-md" onClick={handleAddAddress}>Add Address</button>
                <button className="bg-[#ea088c] px-4 py-1.5 ml-4 text-white rounded-md">Find Connection</button>
            </div>

            <div>

            </div>

        </div>
    )
}

export default AddressFields