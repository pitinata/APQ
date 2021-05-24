@extends('basic')

@section('content')
    <div>
        <form method="POST" enctype="multipart/form-data" action="{{ route('paper.generate') }}">
            @csrf
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Paper Number</td>
                <td>
                    <select name="paperId" id="paperId">
                        @foreach($papers as $paper)
                            @if(count($paper->quiz) > 0)
                                <option value="{{ $paper->paper_id }}">#{{ $paper->paper_id }} ({{ count($paper->quiz) }} question(s))</option>
                            @endif
                        @endforeach
                    </select>
                </td>
            </tr>
        </table>

        <button type="submit" name="download">Download</button>
    </div>
    @if($errors->any())
        <div style="color: red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
@endsection
